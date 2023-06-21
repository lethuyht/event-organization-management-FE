import { getToken } from '#/shared/utils/token';
import Container from '../common/Container';

import { FooterComponent } from './Footer';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}
function ClientLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative bg-white">
      <Header authenticated={!!getToken()} />
      <Container className="relative top-[128px] min-h-screen bg-white">
        {children}
      </Container>
      <FooterComponent />
    </div>
  );
}

export default ClientLayout;
