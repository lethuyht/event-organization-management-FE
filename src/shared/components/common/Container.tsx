interface ContainerProps {
  children: React.ReactNode;
  isFluid?: boolean;
  className?: string;
}

function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-container px-4 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
