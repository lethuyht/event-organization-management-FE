import { ShoppingCartOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

interface Props {
  itemCount: number;
}

const CartStyles = styled.div`
  padding: 0 20px;
  .cart-icon-container {
    font-size: 40px;
    position: relative;
    cursor: pointer;
  }

  .cart-item-count {
    position: absolute;
    top: 0px;
    right: -10px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 2px 5px;
    font-size: 12px;
    font-weight: bold;
  }
`;

export const CartIcon = ({ itemCount }: Props) => {
  return (
    <CartStyles>
      <div className="cart-icon-container">
        <ShoppingCartOutlined className="cart-icon" />
        {itemCount > 0 && <div className="cart-item-count">{itemCount}</div>}
      </div>
    </CartStyles>
  );
};

export default CartIcon;
