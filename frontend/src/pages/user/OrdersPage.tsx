import { UserDashboard } from '../../components/layout/UserDashboard';
import { OrderHistory } from '../../components/user/OrderHistory';

export const OrdersPage = () => {
  return (
    <UserDashboard>
      <OrderHistory />
    </UserDashboard>
  );
};
