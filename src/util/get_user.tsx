import { firebase } from 'src/firebase';
import { Constant } from 'src/constant';

type T_Users = {
  createdAt: number;
  icon: string;
  uid: string;
  uname: string;
  rid?: string;
};

export const get_user = async (): Promise<{
  exist: boolean;
  data?: T_Users;
}> => {
  return new Promise(async resolve => {
    firebase
      .database()
      .ref(Constant.firebase_databases.users)
      .child((await firebase.auth().currentUser?.uid) as string)
      .once('value', async snapshot => {
        if (!snapshot.exists()) {
          resolve({ exist: false });
          return;
        }

        const data: T_Users = snapshot.val();

        resolve({ exist: true, data: data });
      });
  });
};
