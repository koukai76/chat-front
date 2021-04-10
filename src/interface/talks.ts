export type T_Talks = {
  [key: string]: {
    [key: string]: {
      uid: string;
      icon: number;
      uname: string;
      message: string;
      kind: number;
      createdAt: number;
    };
  };
};
