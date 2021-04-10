import { FormProvider } from 'react-hook-form';

import { useLoungeHooks } from 'src/hooks/lounge';

import { BasciModal } from 'src/layouts/basic_modal';
import Body from 'src/components/lounge/create_room_modal/body';
import Footer from 'src/components/lounge/create_room_modal/footer';

const index = (params: { id: string }) => {
  const { methods, on_submit } = useLoungeHooks();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(on_submit)}
        onKeyDown={e =>
          e.keyCode === 13 && document.getElementById('submit')?.click()
        }
      >
        <BasciModal
          id={params.id}
          title={'部屋作成'}
          bodyComponent={<Body/>}
          footerComponent={<Footer />}
        />
      </form>
    </FormProvider>
  );
};

export default index;
