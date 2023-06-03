interface ContainerProps {
  children: React.ReactNode;
  isFluid?: boolean;
  className?: string;
}

function Container({ children, className = '' }: ContainerProps) {
  return <div className={` ${className}`}>{children}</div>;
}

export default Container;
