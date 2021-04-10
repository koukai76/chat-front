import React from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { firebase } from 'src/firebase';
import { Constant } from 'src/constant';
import { State } from 'src/recoil';

import { T_Rooms } from 'src/interface/rooms';
import { T_Talks } from 'src/interface/talks';

import { get_user } from 'src/util/get_user';
import { check_user } from 'src/util/check_user';

const orderBy = require('lodash.orderby');

const useInit = () => {
  const [, setLoading] = useRecoilState(State.loading);
  const router = useRouter();

  const [, setInfo] = useRecoilState(State.room.info);
  const [, setTalk] = useRecoilState(State.room.talk);

  const [uid, setUid] = React.useState('');

  React.useEffect(() => {
    const surveillance = async (rid: string) => {
      // 部屋にいるか見張る
      const regular = async () => {
        try {
          const ret = await firebase
            .database()
            .ref(Constant.firebase_databases.rooms)
            .child(rid)
            .once('value');

          if (ret.exists() === false) {
            setLoading(true);
            window.location.href = `/${Constant.place.lounge}`;
            return;
          }
        } catch (error) {
        } finally {
          setTimeout(regular, 1000);
        }
      };

      regular();

      // 部屋情報変更検知
      firebase
        .database()
        .ref(Constant.firebase_databases.rooms)
        .child(rid)
        .on('value', async snapshot => {
          if (!snapshot.exists()) {
            return;
          }

          const data: T_Rooms = snapshot.val();

          const user = await get_user();
          if (user.data?.rid == null) {
            setLoading(true);
            window.location.href = `/${Constant.place.lounge}`;
            return;
          }

          if (await check_user(user.data?.rid)) {
            setInfo(data);
            setLoading(false);
            return;
          }

          setLoading(true);
          window.location.href = `/${Constant.place.lounge}`;
        });

      // 部屋トーク履歴変更検知
      firebase
        .database()
        .ref(Constant.firebase_databases.talks)
        .child(rid)
        .orderByChild('createdAt')
        .limitToLast(30)
        .on('value', async snapshot => {
          if (!snapshot.exists()) {
            return;
          }

          const data: T_Talks['key']['key'][] = orderBy(
            snapshot.val(),
            'createdAt',
            'desc'
          );

          setTalk(data);
        });
    };

    firebase.auth().onAuthStateChanged(async data => {
      if (data === null) {
        await firebase.auth().signInAnonymously();
        return;
      }

      setUid((await firebase.auth().currentUser?.uid) as string);

      const ret = await get_user();

      if (ret.exist === false) {
        router.push(`/`);
        return;
      }

      if (ret.data?.rid == null) {
        router.push(`/${Constant.place.lounge}`);
        return;
      }

      if (!(await check_user(ret.data?.rid))) {
        router.push(`/${Constant.place.lounge}`);
        return;
      }

      surveillance(ret.data?.rid);
    });

    return () => {
      setLoading(true);
    };
  }, []);

  return { uid };
};

export default useInit;
