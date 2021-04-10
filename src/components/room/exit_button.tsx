import Button from '@material-ui/core/Button';

import { useRoomHooks } from 'src/hooks/room';

export const ExitButton = () => {
  const { exit } = useRoomHooks();

  return (
    <Button variant="contained" color="secondary" onClick={() => exit()}>
      退室
    </Button>
  );
};
