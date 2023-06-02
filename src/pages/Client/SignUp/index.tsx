import ClientLayout from '#/shared/components/layout/ClientLayout';
import { Typography } from 'antd';

import SignUpForm from './SignUp';


export const SignUp = () => {
  
  return (
    <ClientLayout >
      <div className='w-full flex justify-center'>
        <SignUpForm className="w-1/2 rounded-2xl  bg-[#ccc]  " />
      </div>    
     
    </ClientLayout>
  );
};

export default SignUp;
