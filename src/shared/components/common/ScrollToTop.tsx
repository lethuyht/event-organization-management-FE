import { UpCircleOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopStyle = styled.div`
  .scroll-to-top-button {
    position: fixed;
    bottom: 70px;
    right: 20px;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    color: #fff !important;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s, opacity 0.3s;
    transform: translateY(100%);
    background-color: var(--primary-color);
    filter: drop-shadow(0 0 0.75rem var(--primary-color));
  }

  .scroll-to-top-button.show {
    transform: translateY(0);
    opacity: 1;
  }

  svg {
    color: #fff !important;
  }
`;

const pathNotShowScrollToTop = [
  'sign-in',
  'sign-up',
  'verify-code',
  'admin',
  'profile',
];

const ScrollToTopButton = () => {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const isNotShow = pathNotShowScrollToTop.some(path =>
      pathname.includes(path),
    );

    if (!isNotShow) {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [pathname]);

  const handleScrollToTop = () => {
    setShowButton(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ScrollToTopStyle>
      <button
        className={`scroll-to-top-button ${showButton ? 'show' : 'hidden'}`}
        onClick={handleScrollToTop}
      >
        <UpCircleOutlined className="icon" />
      </button>
    </ScrollToTopStyle>
  );
};

export default ScrollToTopButton;
