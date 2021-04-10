import { atom } from 'recoil';

import { T_Rooms } from 'src/interface/rooms';
import { T_Talks } from 'src/interface/talks';

export const State = {
  loading: atom({
    key: 'loading',
    default: true,
  }),
  lounge: {
    data: atom({
      key: 'lounge_data',
      default: [] as T_Rooms[],
    }),
  },
  room: {
    talk: atom({
      key: 'room_talk',
      default: [] as T_Talks['key']['key'][],
    }),
    info: atom({
      key: 'room_info',
      default: {} as T_Rooms,
    }),
  },
};
