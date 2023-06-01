import { Typography } from 'antd';

interface SignInRequiredProps {
  title: string;
  description?: string;
}

function SignInRequired({ title, description }: SignInRequiredProps) {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-4 p-8">
      <Typography className="text-2xl font-bold text-primary-color">
        {title?.toUpperCase()}
      </Typography>
      <Typography className="italic">{description}</Typography>
    </div>
  );
}

export default SignInRequired;
