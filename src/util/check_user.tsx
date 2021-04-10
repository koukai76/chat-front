import { firebase } from 'src/firebase';
import { Constant } from 'src/constant';

export const check_user = (rid: string): Promise<boolean> => {
  return new Promise(async resolve => {
    if (rid.length === 0) {
      resolve(false);
      return
    }
    
    firebase
      .database()
      .ref(Constant.firebase_databases.rooms)
      .child(rid)
      .child('member')
      .child((await firebase.auth().currentUser?.uid) as string)
      .once('value', async snapshot => {
        if (!snapshot.exists()) {
          resolve(false);
          return;
        }

        resolve(true);
      });
  });
};
