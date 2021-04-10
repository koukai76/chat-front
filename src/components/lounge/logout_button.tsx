import Button from '@material-ui/core/Button';

import { useLoungeHooks } from 'src/hooks/lounge';

export const LogoutButton = () => {
  const { logout } = useLoungeHooks();

  return (
    <Button variant="contained" color="secondary" onClick={() => logout()}>
      ログアウト
    </Button>
  );
};
