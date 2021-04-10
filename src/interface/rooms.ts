export type T_Rooms = {
  info: {
    rid: string;
    limit: number;
    rname: string;
    hostid: string;
    createdAt: number;
  };
  member: {
    [key: string]: {
      uname: string;
      icon: number;
      updatedAt: number;
    };
  };
  blacklist?: {
    [key: string]: {
      createdAt: number;
    };
  };
};
