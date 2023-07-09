import '#/configs/theme/index.less';
import '#/shared/utils/style.css';
import { ApolloProvider } from '@apollo/client';
import * as Sentry from '@sentry/react';
import { ConfigProvider } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import 'antd/dist/antd.css';

import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { formConfig } from './configs/config';
import { client } from './graphql/client';
import App from './routers/App';
import i18n from './shared/i18n';
import { getPopupContainer } from './shared/utils/tools';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Ho_Chi_Minh');

createRoot(document.getElementById('root')!).render(
  <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
    <I18nextProvider i18n={i18n}>
      <ApolloProvider client={client}>
        <ConfigProvider
          getPopupContainer={getPopupContainer}
          form={formConfig}
          componentSize="large"
          locale={viVN}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfigProvider>
      </ApolloProvider>
    </I18nextProvider>
  </Sentry.ErrorBoundary>,
);
