import React from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import { State } from 'src/recoil';
import { useRecoilState } from 'recoil';

import { firebase } from 'src/firebase';
import { Constant } from 'src/constant';
import { get_headers } from 'src/util/get_headers';
import { create_file_name } from 'src/util/create_file_name';
import { get_user } from 'src/util/get_user';

type FormState = {
  message: string;
};

const set_images_table = async (url: string) => {
  firebase
    .database()
    .ref(Constant.firebase_databases.images)
    .push({
      uid: (await firebase.auth().currentUser?.uid) as string,
      url: url,
      createdAt: new Date().getTime(),
    });
};

export const useRoomHooks = () => {
  const [, setLoading] = useRecoilState(State.loading);

  const methods = useForm<FormState>({
    mode: 'onChange',
    defaultValues: { message: '' },
  });

  const on_submit = async (data: FormState) => {
    try {
      if (data.message.length === 0) {
        return;
      }

      methods.setValue('message', '');

      document.getElementById('textarea')?.blur();
      setTimeout(() => {
        document.getElementById('textarea')?.focus();
      }, 500);

      const _user = await get_user();

      if (_user.data == null) {
        return;
      }

      await firebase
        .database()
        .ref(Constant.firebase_databases.talks)
        .child(_user.data.rid as string)
        .push({
          uid: _user.data.uid,
          icon: _user.data.icon,
          uname: _user.data.uname,
          message: data.message,
          kind: 0,
          createdAt: new Date().getTime(),
        });

      fetch(`${Constant.endPoint}/create_talk`, {
        method: 'post',
        headers: await get_headers(),
        body: JSON.stringify({
          message: data.message,
        }),
      });
    } catch (error) {}
  };

  const exit = async () => {
    setLoading(true);

    await fetch(`${Constant.endPoint}/exit_room`, {
      method: 'get',
      headers: await get_headers(),
    });

    window.location.href = `/${Constant.place.lounge}`;
  };

  // 画像アップロード
  const upload_image = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) {
      return;
    }

    setLoading(true);

    try {
      // 画像アップロード
      const _image = await firebase
        .storage()
        .ref()
        .child(create_file_name())
        .put(e.target.files[0]);

      // 画像のURL取得
      const url = await _image.ref.getDownloadURL();

      if (url == null) {
        throw new Error('');
      }

      const _user = await get_user();
      if (_user.data == null) {
        return;
      }

      await firebase
        .database()
        .ref(Constant.firebase_databases.talks)
        .child(_user.data.rid as string)
        .push({
          uid: _user.data.uid,
          icon: _user.data.icon,
          uname: _user.data.uname,
          message: url,
          kind: 0,
          createdAt: new Date().getTime(),
        });

      on_submit({ message: '' });
      set_images_table(url);
      setLoading(false);
    } catch (error) {
      alert('画像のサイズは5MBまでです。');
      window.location.reload();
    }
  };

  const update_rname = async () => {
    const room_name = window.prompt('新しい部屋名を入力', '');
    if (room_name === '' || room_name == null) {
      return;
    }

    if (!validator.isLength(room_name, { min: 1, max: 15 })) {
      alert('部屋名の長さは1～15文字以内');
      return;
    }

    (document.getElementById('_close') as HTMLElement).click();
    setLoading(true);

    const res = await fetch(`${Constant.endPoint}/update_rname`, {
      method: 'post',
      headers: await get_headers(),
      body: JSON.stringify({
        rname: room_name,
      }),
    });

    if (res.status !== 200) {
      return;
    }

    alert('変更しました');
    setLoading(false);
  };

  const update_limit = async () => {
    const room_limit = window.prompt('上限人数を入力(2～15)', '');
    if (room_limit === '' || room_limit == null) {
      return;
    }

    if (!validator.isInt(room_limit, { min: 2, max: 15 })) {
      alert('2～15の数値を入力してください');
      return;
    }

    (document.getElementById('_close') as HTMLElement).click();
    setLoading(true);
    const res = await fetch(`${Constant.endPoint}/update_limit`, {
      method: 'post',
      headers: await get_headers(),
      body: JSON.stringify({
        limit: Number(room_limit),
      }),
    });

    if (res.status !== 200) {
      return;
    }

    alert('変更しました');
    setLoading(false);
  };

  const update_host = async (id: string) => {
    (document.getElementById('_close') as HTMLElement).click();
    setLoading(true);

    const res = await fetch(`${Constant.endPoint}/update_host`, {
      method: 'post',
      headers: await get_headers(),
      body: JSON.stringify({
        transfer: id,
      }),
    });

    if (res.status !== 200) {
      return;
    }

    alert('移譲しました');
    setLoading(false);
  };

  const update_blacklist = async (id: string) => {
    (document.getElementById('_close') as HTMLElement).click();
    setLoading(true);

    const res = await fetch(`${Constant.endPoint}/update_blacklist`, {
      method: 'post',
      headers: await get_headers(),
      body: JSON.stringify({
        uid: id,
      }),
    });

    if (res.status !== 200) {
      return;
    }

    alert('追放しました');
    setLoading(false);
  };

  return {
    methods,
    on_submit,
    exit,
    upload_image,
    update_blacklist,
    update_host,
    update_limit,
    update_rname,
  };
};
