import { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  className?: string;
  extraAction?: ReactNode;
}

function PageTitle({ title, description, extraAction, className }: Props) {
  return (
    <div className={`mb-8 flex w-full items-center ${className}`}>
      <div className="flex flex-1 flex-col text-color-gray">
        <div className="py-4 text-center font-sans text-4xl font-bold text-white">
          {title}
        </div>
        {description && (
          <div className="text-center text-lg font-medium text-color-gray">
            {description}
          </div>
        )}
      </div>

      <div className="mb-2 ml-4">{extraAction}</div>
    </div>
  );
}

export default PageTitle;
