import styled from '@emotion/styled';

const FilterSelectorWrapper = styled.div`
  .ant-select {
    background-color: var(--color-white-blur) !important;
    border-radius: 1rem;
    border: none;
    backdrop-filter: blur(60px);
    font-size: 1.125rem;
    transform: translateY(-0.5px);
    height: 100%;
    &-selection-search {
      display: flex;
      align-items: center;
    }
    &-clear {
      background: none;
    }
    &-selector {
      border: none !important;
      border-radius: 1rem !important;
      padding: 0.65rem !important;
      height: 100% !important;
    }
    &-focus {
      border-radius: 1rem;
    }
    &-item {
      font-size: 1.125rem;
      padding: 1rem !important;
    }
    &-item-option {
      &-content {
        padding: 1rem !important;
      }
      &-active {
        &:not(.ant-select-item-option-disabled) {
          font-size: 1.125rem;
        }
      }
      &-selected {
        &:not(.ant-select-item-option-disabled) {
        }
      }
    }
    &-dropdown {
      background-color: rgba(0, 0, 0, 0.8);
      padding-block: 0px;
      border-radius: 0.5rem;
    }
  }
  .rc-virtual-list-holder {
    background-color: red !important;
  }
`;

export default FilterSelectorWrapper;
