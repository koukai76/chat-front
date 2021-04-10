import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { T_Rooms } from 'src/interface/rooms';

import { useLoungeHooks } from 'src/hooks/lounge';

const RoomName = (params: { name: string }) => {
  return (
    <>
      <ListItem button>
        <ListItemText
          primary={
            <Typography style={{ fontWeight: 'bold' }}>
              {params.name}
            </Typography>
          }
          style={{ wordWrap: 'break-word' }}
        />
      </ListItem>
      <Divider />
    </>
  );
};

const JoinButton = (params: { rid: string }) => {
  const { join } = useLoungeHooks();

  return (
    <>
      <ListItem button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => join(params.rid)}
        >
          入室
        </Button>
      </ListItem>
      <Divider />
    </>
  );
};

const MemberName = (params: { name: string }) => {
  return (
    <>
      <ListItem button>
        <ListItemText
          primary={params.name}
          style={{ wordWrap: 'break-word' }}
        />
      </ListItem>
      <Divider />
    </>
  );
};

export const Info = (params: { data: T_Rooms[] }) => {
  return (
    <>
      {params.data.map((m, i) => {
        return (
          <Box
            css={{ width: 300, border: '1px solid black' }}
            style={{ background: '#fff' }}
            m={1}
            key={i}
          >
            <List component="nav" aria-label="mailbox folders">
              <RoomName name={m.info.rname} />

              {m.info.limit > Object.keys(m.member).length && (
                <JoinButton rid={m.info.rid} />
              )}

              {Object.keys(m.member).map(key => {
                return (
                  <div key={key}>
                    <MemberName name={m.member[key].uname} />
                  </div>
                );
              })}
            </List>
          </Box>
        );
      })}
    </>
  );
};
