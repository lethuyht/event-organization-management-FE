import { LoadingOutlined } from '@ant-design/icons';

interface LoadingProps {
  loading?: boolean;
  children?: React.ReactNode;
}

function Loading({ loading, children }: LoadingProps) {
  return loading ? (
    <div
      className={`flex h-full w-full items-center justify-center py-8 text-3xl`}
    >
      <LoadingOutlined />
    </div>
  ) : (
    <>{children}</>
  );
}

export default Loading;
