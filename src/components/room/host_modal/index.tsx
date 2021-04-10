import { BasciModal } from 'src/layouts/basic_modal';
import Body from 'src/components/room/host_modal/body';
import Footer from 'src/components/room/host_modal/footer';

const index = (params: { id: string }) => {
  return (
    <BasciModal
      id={params.id}
      title={'ホスト権限'}
      bodyComponent={<Body />}
      footerComponent={<Footer />}
    />
  );
};

export default index;
