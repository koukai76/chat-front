import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import { firebase } from 'src/firebase';
import { State } from 'src/recoil';
import { Constant } from 'src/constant';

type FormState = {
  name: string;
  icon: number;
};

const creact_user = async (params: { uname: string; icon: number }) => {
  const uid = (await firebase.auth().currentUser?.uid) as string;

  await firebase
    .database()
    .ref(Constant.firebase_databases.users)
    .child(uid)
    .set({
      uid: uid,
      rid: 'init',
      uname: params.uname,
      icon: params.icon,
      createdAt: new Date().getTime(),
    });
};

export const useRootHooks = () => {
  const router = useRouter();
  const [_, setLoading] = useRecoilState(State.loading);

  const methods = useForm<FormState>({
    mode: 'onChange',
    defaultValues: { name: '', icon: 0 },
  });

  const on_submit = async (data: FormState) => {
    methods.setValue('name', '');
    setLoading(true);

    await creact_user({ uname: data.name, icon: Number(data.icon) });
    router.push(`/${Constant.place.lounge}`);
  };

  return { methods, on_submit };
};
