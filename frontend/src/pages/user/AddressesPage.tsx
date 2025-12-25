import { UserDashboard } from '../../components/layout/UserDashboard';
import { AddressBook } from '../../components/user/AddressBook';

export const AddressesPage = () => {
  return (
    <UserDashboard>
      <AddressBook />
    </UserDashboard>
  );
};
