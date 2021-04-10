import React from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { firebase } from 'src/firebase';
import { Constant } from 'src/constant';
import { State } from 'src/recoil';

import { T_Rooms } from 'src/interface/rooms';

import { get_user } from 'src/util/get_user';
import { check_user } from 'src/util/check_user';

const orderBy = require('lodash.orderby');

const useInit = () => {
  const [, setLoading] = useRecoilState(State.loading);
  const router = useRouter();

  const [, setData] = useRecoilState(State.lounge.data);

  React.useEffect(() => {
    const surveillance = async () => {
      const ret = await firebase
        .database()
        .ref(Constant.firebase_databases.rooms)
        .once('value');

      if (!ret.exists()) {
        setLoading(false);
        return;
      }

      firebase
        .database()
        .ref(Constant.firebase_databases.rooms)
        .on('value', async snapshot => {
          if (!snapshot.exists()) {
            return;
          }

          const ret: T_Rooms[] = orderBy(
            snapshot.val(),
            (item: T_Rooms) => item.info.createdAt,
            ['desc']
          );

          const user = await get_user();
          if (user.data?.rid == null) {
            setData(ret);
            setLoading(false);
            return;
          }

          if (await check_user(user.data?.rid)) {
            setLoading(true);
            router.push(`/${Constant.place.room}`);
            return;
          }

          setData(ret);
          setLoading(false);
        });
    };

    firebase.auth().onAuthStateChanged(async data => {
      if (data === null) {
        await firebase.auth().signInAnonymously();
        return;
      }

      const ret = await get_user();

      if (ret.exist === false) {
        setLoading(true);
        router.push(`/`);
        return;
      }

      if (ret.data?.rid == null) {
        setLoading(true);
        surveillance();
        return;
      }

      if (await check_user(ret.data?.rid)) {
        setLoading(true);
        router.push(`/${Constant.place.room}`);
        return;
      }

      surveillance();
    });

    return () => {
      setLoading(true);
      firebase.database().ref(Constant.firebase_databases.rooms).off('value');
    };
  }, []);

  return {};
};

export default useInit;
