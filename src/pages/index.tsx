import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import { Constant } from 'src/constant';
import { State } from 'src/recoil';

import Grid from '@material-ui/core/Grid';

import { Loading } from 'src/components/loading';
import { Icons } from 'src/components/root/icons';
import { SubmitButon } from 'src/components/root/submit_button';
import { InputText } from 'src/components/root/input';

import { useRootHooks } from 'src/hooks';
import useInit from 'src/init/root';

const Root = () => {
  const [loading] = useRecoilState(State.loading);
  const { methods, on_submit } = useRootHooks();

  useInit();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Grid container justify="center">
        <Grid container alignItems="center" justify="center">
          <h1 style={{ fontSize: 30, color: '#fff' }}>{Constant.title}</h1>
        </Grid>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(on_submit)}
            onKeyDown={e =>
              e.keyCode === 13 && document.getElementById('submit')?.click()
            }
          >
            <Icons />

            <hr />

            <Grid
              container
              alignItems="center"
              justify="center"
              style={{ width: 300 }}
            >
              <Grid item xs={8}>
                <InputText />
                <br />
                <SubmitButon />
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </Grid>

      <style jsx>{`
        hr {
          color: #fff;
        }
      `}</style>
    </>
  );
};

export default Root;
