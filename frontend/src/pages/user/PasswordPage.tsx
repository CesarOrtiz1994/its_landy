import { UserDashboard } from '../../components/layout/UserDashboard';
import { ChangePassword } from '../../components/user/ChangePassword';

export const PasswordPage = () => {
  return (
    <UserDashboard>
      <ChangePassword />
    </UserDashboard>
  );
};
