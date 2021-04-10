import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import { State } from 'src/recoil';
import { firebase } from 'src/firebase';
import { Constant } from 'src/constant';
import { get_headers } from 'src/util/get_headers';

type FormState = {
  rname: string;
  limit: number;
};

export const useLoungeHooks = () => {
  const router = useRouter();
  const [_, setLoading] = useRecoilState(State.loading);

  const methods = useForm<FormState>({
    mode: 'onChange',
    defaultValues: { rname: '', limit: 15 },
  });

  const on_submit = async (data: FormState) => {
    methods.setValue('rname', '');

    (document.getElementsByClassName(
      'btn-close'
    ) as HTMLCollectionOf<HTMLElement>)[0].click();
    setLoading(true);

    const res = await fetch(`${Constant.endPoint}/create_room`, {
      method: 'post',
      headers: await get_headers(),
      body: JSON.stringify({
        rname: data.rname,
        limit: data.limit,
      }),
    });

    if (res.status !== 200) {
      return;
    }

    router.push(`/${Constant.place.room}`);
  };

  const join = async (rid: string) => {
    setLoading(true);

    const res = await fetch(`${Constant.endPoint}/join_room`, {
      method: 'post',
      headers: await get_headers(),
      body: JSON.stringify({
        rid: rid,
      }),
    });

    if (res.status !== 200) {
      return;
    }

    const ret: { place: string } = await res.json();

    if (ret.place === Constant.place.room) {
      router.push(`/${Constant.place.room}`);
      return;
    }

    window.location.reload();
  };

  const logout = async () => {
    setLoading(true);

    await firebase
      .database()
      .ref(Constant.firebase_databases.users)
      .child((await firebase.auth().currentUser?.uid) as string)
      .remove();

    router.push(`/`);
  };

  return { methods, on_submit, join, logout };
};
