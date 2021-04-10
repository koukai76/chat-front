import { firebase } from 'src/firebase';

export const get_headers = async () => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set(
    'Authorization',
    (await firebase.auth().currentUser?.getIdToken(true)) as string
  );

  return requestHeaders;
};
