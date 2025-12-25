import { UserDashboard } from '../../components/layout/UserDashboard';
import { ProfileSettings } from '../../components/user/ProfileSettings';

export const ProfilePage = () => {
  return (
    <UserDashboard>
      <ProfileSettings />
    </UserDashboard>
  );
};
