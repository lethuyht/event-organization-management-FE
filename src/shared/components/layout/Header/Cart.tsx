import { useGetMyCartQuery } from '#/generated/schemas';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const CartStyles = styled.div`
  padding: 0 20px;

  .cart-icon-container {
    font-size: 40px;
    position: relative;
    cursor: pointer;

    svg {
      font-size: 40px;
      color: #fff !important;
    }
  }

  .cart-item-count {
    position: absolute;
    top: 0px;
    right: -10px;
    background-color: red;
    color: white !important;
    border-radius: 50%;
    padding: 2px 5px;
    font-size: 12px;
    font-weight: bold;
  }
`;

export const CartIcon = () => {
  const { data } = useGetMyCartQuery();
  const navigate = useNavigate();

  return (
    <CartStyles>
      <div className="cart-icon-container">
        <ShoppingCartOutlined
          className="cart-icon"
          onClick={() => navigate('/cart')}
        />
        {data?.getMyCart.cartItems && data.getMyCart.cartItems?.length > 0 && (
          <div className="cart-item-count font-sans">
            {data.getMyCart.cartItems?.length}
          </div>
        )}
      </div>
    </CartStyles>
  );
};

export default CartIcon;
