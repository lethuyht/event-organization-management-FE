import { Tooltip, Typography } from 'antd';

interface Props {
  content?: string | null | React.ReactNode;
  className?: string;
  background?: string;
}

function TextTooltip({ content, className = '', background = '' }: Props) {
  return (
    <>
      <Tooltip
        title={content ? content : 'N/A'}
        className={className}
        color={background}
      >
        <Typography.Text ellipsis>{content}</Typography.Text>
      </Tooltip>
    </>
  );
}

export default TextTooltip;
