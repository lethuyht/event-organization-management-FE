import styled from '@emotion/styled';
import { Input } from 'antd';

const FilterInput = styled(Input)`
  background-color: var(--color-white-blur) !important;
  border-radius: 1rem;
  border: none;
  backdrop-filter: blur(60px);
  padding: 1rem;
  font-size: 1.125rem;
  .ant-input-lg {
    font-size: 1.125rem;
  }
`;

export default FilterInput;
