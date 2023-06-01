import { useGetMeLazyQuery } from '#/generated/schemas';
import Loading from '#/shared/components/common/Loading';
import { getToken } from '#/shared/utils/token';
import { ROLE } from '#/shared/utils/type';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  roles?: ROLE[];
  isPrivate?: boolean;
  children: JSX.Element;
}

function GuardRoute({ isPrivate = false, children, roles }: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [getMeQuery, { data: getMeData }] = useGetMeLazyQuery({
    onCompleted(res) {
      if (roles && !roles.includes(res.getMe.role.name as ROLE)) {
        navigate('/', {
          replace: true,
        });
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const accessToken = getToken();

      if (!accessToken && isPrivate) {
        navigate('/sign-in', {
          replace: true,
        });
      }
      if (accessToken) {
        getMeQuery();
      }

      setLoading(false);
    })();
  }, [navigate, isPrivate]);

  if (loading) return <Loading />;
  return children;
}

export default GuardRoute;
