import _firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

if (!_firebase.apps.length) {
  _firebase.initializeApp({
    apiKey: 'AIzaSyBg_F6Eh8ptSoSgHfG8SNnqjFmI4rJgmQM',
    authDomain: 'chat-test-acaf0.firebaseapp.com',
    databaseURL: 'https://chat-test-acaf0-default-rtdb.firebaseio.com',
    projectId: 'chat-test-acaf0',
    storageBucket: 'chat-test-acaf0.appspot.com',
    messagingSenderId: '342074842921',
    appId: '1:342074842921:web:c3aa8da14642802fafa138',
    measurementId: 'G-LRR5V6MDV6',
  });
}

export const firebase = _firebase;
