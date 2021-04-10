import { BasciModal } from 'src/layouts/basic_modal';
import Body from 'src/components/room/info_modal/body';

const index = (params: { id: string }) => {
  return (
    <BasciModal
      id={params.id}
      title={'詳細'}
      bodyComponent={<Body />}
      footerComponent={<></>}
    />
  );
};

export default index;
