import { SignInDto, useSignInMutation } from '#/generated/schemas';
import { useNavigate } from 'react-router-dom';
import {
  clearLocalStorage,
  setRefreshToken,
  setToken,
  setUserId,
} from '../utils/token';
import { showError } from '../utils/tools';
import { ROLE } from '../utils/type';

const useAuthentication = () => {
  const navigate = useNavigate();
  const [signInMutation, { loading: signInLoading }] = useSignInMutation({
    onCompleted(res) {
      setToken(res.signIn.token);
      localStorage.setItem('role', res.signIn.role?.name || '');
      setRefreshToken(res.signIn.refreshToken);
      setUserId(res.signIn.id);
      if (res.signIn.role?.name === ROLE.ADMIN) {
        navigate('/admin/statistic');
        window.location.reload();
      } else {
        navigate('/');
        window.location.reload();
      }
    },
    onError: showError,
  });

  const handleSignIn = (input: SignInDto) => {
    signInMutation({
      variables: {
        input,
      },
    });
  };

  const handleLogout = () => {
    navigate('/sign-in');
    clearLocalStorage();
  };

  return {
    handleSignIn,
    signInLoading,
    handleLogout,
  };
};

export default useAuthentication;
