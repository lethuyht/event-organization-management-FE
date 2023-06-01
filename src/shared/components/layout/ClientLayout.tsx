import { getToken } from '#/shared/utils/token';
import { useEffect } from 'react';
import Container from '../common/Container';

interface MainLayoutProps {
  children: React.ReactNode;
}
function ClientLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative flex h-full  min-h-screen flex-col bg-main bg-top bg-repeat-x pt-16">
      {/* <Container>
        <Header authenticated={!!getToken()} />
      </Container>
      <Container className="min-h-screen pt-24 pb-5">{children}</Container>
      <Container>
        <Footer />
      </Container> */}
    </div>
  );
}

export default ClientLayout;
