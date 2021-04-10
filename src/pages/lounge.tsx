import React from 'react';
import { useRecoilState } from 'recoil';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { State } from 'src/recoil';

import { Loading } from 'src/components/loading';
import { Info } from 'src/components/lounge/info';
import { LogoutButton } from 'src/components/lounge/logout_button';
import { CreateRoomButton } from 'src/components/lounge/create_room_button';
import CreateRoomModal from 'src/components/lounge/create_room_modal';

import useInit from 'src/init/lounge';

const Lounge = () => {
  const [loading] = useRecoilState(State.loading);
  const [data] = useRecoilState(State.lounge.data);

  useInit();

  if (loading) {
    return <Loading />;
  }

  const id = 'create_room';
  return (
    <>
      <div style={{ maxWidth: 768, margin: '0 auto' }}>
        <div className="clearfix">
          <div className="float-start">
            <CreateRoomButton id={id} />
            <CreateRoomModal id={id} />
          </div>
          <div className="float-end">
            <LogoutButton />
          </div>
        </div>
      </div>

      <hr />

      <Grid container justify="center">
        <Box display="flex" flexWrap="wrap" p={1} m={1} css={{ maxWidth: 992 }}>
          <Info data={data} />
        </Box>
      </Grid>

      <style jsx>{`
        hr {
          color: #fff;
        }
      `}</style>
    </>
  );
};

export default Lounge;
