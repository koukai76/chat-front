import React from 'react';
import { useRecoilState } from 'recoil';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import { firebase } from 'src/firebase';
import { Constant } from 'src/constant';
import { State } from 'src/recoil';

import { T_Rooms } from 'src/interface/rooms';

const RoomName = (params: { name: string }) => {
  return (
    <div className="form-group">
      <label>部屋名</label>
      <input
        type="text"
        className="form-control"
        disabled
        value={params.name}
      />
    </div>
  );
};

const RoomLimit = (params: { limit: number }) => {
  return (
    <div className="form-group">
      <label>上限人数</label>
      <input
        type="text"
        className="form-control"
        disabled
        value={params.limit}
      />
    </div>
  );
};

const Users = (params: { member: T_Rooms['member']; hostId: string }) => {
  const [uid, setUid] = React.useState('');

  React.useEffect(() => {
    (async () => {
      const id = (await firebase.auth().currentUser?.uid) as string;
      setUid(id);
    })();
  }, []);

  if (uid === '') {
    return <></>;
  }

  return (
    <List>
      {Object.keys(params.member).map(key => {
        const name =
          key === params.hostId
            ? `★ ${params.member[key].uname}`
            : params.member[key].uname;

        return (
          <div key={key}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <img
                    src={`/img/icon_${
                      Constant.icons[params.member[key].icon]
                    }.png`}
                    alt=""
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        );
      })}
    </List>
  );
};

const body = () => {
  const [info] = useRecoilState(State.room.info);

  return React.useMemo(() => {
    return (
      <>
        <RoomName name={info.info.rname} />
        <RoomLimit limit={info.info.limit} />
        <Users hostId={info.info.hostid} member={info.member} />
      </>
    );
  }, [JSON.stringify(info)]);
};

export default body;
