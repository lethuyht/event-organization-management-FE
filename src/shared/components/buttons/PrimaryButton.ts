import styled from '@emotion/styled';
import { Button } from 'antd';

const PrimaryButton = styled(Button)`
  position: relative;
  font-weight: 700;
  background: #f90;
  border: none;
  font-size: 1rem;
  z-index: 1;
  padding: calc(0.2rem + 2px) 2.5rem;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 3s ease-in-out !important;
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
    background: #ec7211;
    
    border-radius: 1.5rem;
    z-index: -1;
  }
  &:focus {
    background: #ec7211;
    color: black;
  }
  &:hover {
    background: #ec7211;
    color: black;
    &::after {
      filter: blur(0.6rem);
      background: #ec7211
    }
  }
  &:disabled {
    color: var(--secondary-color) !important;
    background: var(--color-gray) !important;
    &::after {
      display: none;
    }
  }
`;

export default PrimaryButton;
