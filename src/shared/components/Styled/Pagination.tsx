import styled from '@emotion/styled';
import { Pagination as AntdPagination, PaginationProps } from 'antd';

const StyledPagination = styled(AntdPagination)`
  .ant-pagination {
    border: none !important;
    &-prev,
    &-next {
      .ant-pagination-item-link {
        border: none;
      }
    }
    &-disabled {
      color: var(--color-gray);
    }
    &-item {
      color: var(--color-gray);
      font-size: 1.125rem;
      border: none;
      border-radius: 0.375rem;
      background: none;
      &-active {
        background: linear-gradient(93.26deg, #f91b5a 1.8%, #712bff 98.01%);
        a {
          color: white !important;
        }
      }
      &-hover {
        border: solid 1px var(--primary-color);
      }
      &-link {
        background-color: transparent;
      }
      a {
        color: var(--color-gray);
      }
    }
  }
`;

function Pagination({ ...rest }: PaginationProps) {
  return <StyledPagination {...rest} />;
}

export default Pagination;
