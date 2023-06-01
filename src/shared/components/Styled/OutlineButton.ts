import styled from '@emotion/styled';
import { Button } from 'antd';

const OutlineButton = styled(Button)`
  background: var(--outline-gradient);
  border-radius: 50em;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  color: white;
  padding: 0.2rem 2.5rem;
  justify-content: center;
  font-size: 1rem;
  backdrop-filter: blur(60px);
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin-inline: auto;
    margin-top: 0.1rem;
    width: 100%;
    height: 100%;
    background: var(--gradient-btn);
    filter: blur(0.4rem);
    opacity: 0.4;
    border-radius: 1.5rem;
    z-index: -1;
  }
  &:focus {
    background: var(--outline-gradient);
    color: white;
    border: 2px solid transparent;
  }
  &:hover {
    background: var(--outline-gradient);
    color: white;

    border: 2px solid transparent;
    &::after {
      filter: blur(0.6rem);
    }
  }
  &:focus {
    color: white;
  }
  &:disabled {
    color: var(--secondary-color) !important;
    background: var(--color-gray) !important;
    &::after {
      display: none;
    }
  }
`;

export default OutlineButton;
