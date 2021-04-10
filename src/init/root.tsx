import React from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { firebase } from 'src/firebase';
import { Constant } from 'src/constant';
import { State } from 'src/recoil';

import { get_user } from 'src/util/get_user';
import { check_user } from 'src/util/check_user';

const useInit = () => {
  const [, setLoading] = useRecoilState(State.loading);
  const router = useRouter();

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async data => {
      if (data === null) {
        await firebase.auth().signInAnonymously();
        return;
      }

      const ret = await get_user();

      if (ret.exist === false) {
        setLoading(false);
        return;
      }

      if (ret.data?.rid == null) {
        router.push(`/${Constant.place.lounge}`);
        return;
      }

      if (await check_user(ret.data?.rid)) {
        router.push(`/${Constant.place.room}`);
        return;
      }

      router.push(`/${Constant.place.lounge}`);
    });

    return () => {
      setLoading(true);
    };
  }, []);

  return {};
};

export default useInit;
