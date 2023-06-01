import styled from '@emotion/styled';
import { Tabs as AntdTabs } from 'antd';

const Tabs = styled(AntdTabs)`
  background-color: var(--color-white-blur);
  border-radius: 1.5rem;

  .ant-tabs {
    &-tab {
      padding: 0.25rem !important;
      width: 100%;
      margin: 0px;
      &-btn {
        padding: 0.5rem;
        display: flex;
        justify-content: center;
        width: 100%;
        border-radius: 1.5rem;
        font-weight: 500;
      }
    }
    &-nav {
      &-wrap {
        border-radius: 1.5rem;
      }
      &::before {
        display: none;
      }
      padding: 0px;
      margin: 0;
      &-list {
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-radius: 3rem;
      }
      .ant-tabs-large > .ant-tabs-nav .ant-tabs-tab {
        padding: 0px;
      }
      .ant-tabs-tab {
        margin: 0px;
        &-btn {
          padding: 0.5rem 1rem;
        }
      }
      .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        padding: 0.5rem 1rem;
        position: relative;
        backdrop-filter: blur(40px);
        color: var(--secondary-color);
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, #f91b5a, #712bff);
        &::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: 2px;
          border-radius: inherit;
          background: linear-gradient(93.26deg, #5a061e 1.8%, #22065a 98.01%);
        }
        &:hover {
          background: linear-gradient(to right, #712bff, #f91b5a);
        }
      }
      &-operations {
        display: none !important;
      }
    }
    &-ink-bar {
      display: none;
    }
  }
`;

export default Tabs;
