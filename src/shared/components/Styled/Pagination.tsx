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
        background: var(--primary-color) !important;
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

    .ant-pagination-options {
      .ant-select-dropdown {
        width: fit-content !important;
        min-width: unset !important;
        padding: 0 20px !important;

        .ant-select-item-option {
          padding: 0 30px !important;
          &:hover {
            color: var(--primary-color) !important;
          }
        }
      }
    }
  }
`;

function Pagination({ ...rest }: PaginationProps) {
  return <StyledPagination {...rest} />;
}

export default Pagination;
