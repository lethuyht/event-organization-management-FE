import { Tag, TagProps } from 'antd';

interface Props {
  content: string;
  background?: string;
  tagClassName?: string;
  className?: string;
  rest?: TagProps;
}

function TagCustom({
  className = '',
  content,
  tagClassName = '',
  background,
  ...rest
}: Props & TagProps) {
  return (
    <Tag
      color={background}
      className={`${tagClassName} max-w-fit rounded-lg border-2 border-solid px-[0.5rem] py-[0.1rem]`}
      {...rest}
    >
      <span className={`font-bold ${className}`}>{content}</span>
    </Tag>
  );
}

export default TagCustom;
