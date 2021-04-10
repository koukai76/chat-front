import React from 'react';
import { useRecoilState } from 'recoil';

import { State } from 'src/recoil';
import { firebase } from 'src/firebase';
import { Constant } from 'src/constant';

import { useRoomHooks } from 'src/hooks/room';

const RoomName = () => {
  const { update_rname } = useRoomHooks();

  return (
    <div className="text-center">
      <button
        type="button"
        className="btn btn-success"
        onClick={() => update_rname()}
      >
        部屋名変更
      </button>
    </div>
  );
};

const RoomLimit = () => {
  const { update_limit } = useRoomHooks();

  return (
    <div className="text-center">
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => update_limit()}
      >
        上限変更
      </button>
    </div>
  );
};

const UserIcon = (params: { icon: string }) => {
  return <img src={`/img/icon_${params.icon}.png`} alt="" />;
};

const UserName = (params: { name: string }) => {
  return <p>{params.name}</p>;
};

const HostAuthorityButton = (params: {
  uid: string;
  title: string;
  color: string;
  func: (id: string) => void;
}) => {
  return (
    <button
      type="button"
      className={`btn ${params.color}`}
      style={{ marginRight: 10 }}
      onClick={() => params.func(params.uid)}
    >
      {params.title}
    </button>
  );
};

const body = () => {
  const [info] = useRecoilState(State.room.info);
  const { update_host, update_blacklist } = useRoomHooks();

  const [uid, setUid] = React.useState('');

  React.useEffect(() => {
    (async () => {
      const id = (await firebase.auth().currentUser?.uid) as string;
      setUid(id);
    })();
  }, []);

  return React.useMemo(() => {
    if (uid === '') {
      return <></>;
    }

    return (
      <>
        <RoomName />
        <br />
        <RoomLimit />
        <br />
        <hr />
        {Object.keys(info.member).map(key => {
          if (key === uid) {
            return <div key={key}></div>;
          }

          return (
            <div className="text-center" key={key}>
              <UserIcon icon={Constant.icons[info.member[key].icon]} />
              <UserName name={info.member[key].uname} />
              <HostAuthorityButton
                uid={key}
                title="権限移譲"
                color="btn-info"
                func={update_host}
              />
              <HostAuthorityButton
                uid={key}
                title="追放"
                color="btn-danger"
                func={update_blacklist}
              />
              <hr />
            </div>
          );
        })}
      </>
    );
  }, [JSON.stringify(info), uid]);
};

export default body;
