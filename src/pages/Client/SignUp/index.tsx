import ClientLayout from '#/shared/components/layout/ClientLayout';
import { Typography } from 'antd';

import SignUpForm from './SignUp';

export const SignUp = () => {
  return (
    <ClientLayout>
      <div className="flex w-full justify-center py-24">
        <SignUpForm className="w-1/2 rounded-2xl  bg-[#242424] " />
      </div>
    </ClientLayout>
  );
};

export default SignUp;
