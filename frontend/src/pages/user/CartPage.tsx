import { UserDashboard } from '../../components/layout/UserDashboard';
import { ShoppingCart } from '../../components/user/ShoppingCart';

export const CartPage = () => {
  return (
    <UserDashboard>
      <ShoppingCart />
    </UserDashboard>
  );
};
