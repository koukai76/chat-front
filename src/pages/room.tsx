import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import { State } from 'src/recoil';
import { useRoomHooks } from 'src/hooks/room';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import { Loading } from 'src/components/loading';
import { ExitButton } from 'src/components/room/exit_button';
import { InfotButton } from 'src/components/room/info_button';
import InfoModal from 'src/components/room/info_modal';
import { SendButton } from 'src/components/room/send_button';
import { MessageList } from 'src/components/room/message_list';
import { HostButton } from 'src/components/room/host_button';
import HostModal from 'src/components/room/host_modal';
import { UploadImageButton } from 'src/components/room/upload_image_button';
import { InputTextArea } from 'src/components/room/input_textarea';

import useInit from 'src/init/room';

const Room = () => {
  const { uid } = useInit();

  const [loading] = useRecoilState(State.loading);
  const { methods, on_submit } = useRoomHooks();

  const [info] = useRecoilState(State.room.info);
  const [talk] = useRecoilState(State.room.talk);

  if (loading) {
    return <Loading />;
  }

  if (Object.keys(info).length === 0) {
    return <Loading />;
  }

  if (talk.length === 0) {
    return <Loading />;
  }

  const id_info = 'id_info';
  const id_host = 'id_host';

  return (
    <>
      <div style={{ maxWidth: 768, margin: '0 auto' }}>
        <header>
          <div className="clearfix">
            <div className="float-start">
              <InfotButton id={id_info} />
              <InfoModal id={id_info} />

              {info.info.hostid === uid && (
                <>
                  <HostButton id={id_host} />
                  <HostModal id={id_host} />
                </>
              )}
            </div>
            <div className="float-end">
              <ExitButton />
            </div>
          </div>
        </header>

        <div style={{ height: '1vh' }}>
          <hr />
        </div>

        <main>
          <SimpleBar
            style={{ height: '100%', overflow: 'auto' }}
            autoHide={false}
          >
            <Grid container alignItems="center" justify="center">
              <List style={{ width: '100%', background: '#fff' }}>
                <MessageList talk={talk} />
              </List>
            </Grid>
          </SimpleBar>
        </main>

        <div style={{ height: '1vh' }}>
          <hr />
        </div>

        <footer>
          <UploadImageButton />

          <div className="form-group" style={{ marginTop: 5 }}>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(on_submit)}
                onKeyDown={e =>
                  e.keyCode === 13 && document.getElementById('submit')?.click()
                }
              >
                <InputTextArea />

                <div className="text-center">
                  <SendButton />
                </div>
              </form>
            </FormProvider>

            <br />
          </div>
        </footer>
      </div>

      <style jsx>{`
        header {
          height: 7vh;
        }

        main {
          overflow-y: scroll;
          overflow-wrap: break-word;
          height: 56vh;
        }

        footer {
          height: 35vh;
        }

        hr {
          color: #fff;
        }

        main::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Room;
