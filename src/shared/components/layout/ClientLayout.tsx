import { getToken } from '#/shared/utils/token';
import { useEffect } from 'react';
import Container from '../common/Container';

import { FooterComponent } from './Footer';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}
function ClientLayout({ children }: MainLayoutProps) {
  return (
    <div className='bg-[#fff]'>
      <Header authenticated={!!getToken()} />
      <Container className="min-h-screen bg-[#fff]">{children}</Container>
      <FooterComponent />
    </div>
  );
}

export default ClientLayout;
