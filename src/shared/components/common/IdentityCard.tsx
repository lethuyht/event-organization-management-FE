import { Typography } from 'antd';
import Image from './Image';

interface Props {
  url: string;
  width?: number;
  height?: number;
  description?: string;
}

function IdentityCard({ url, width = 350, height = 210, description }: Props) {
  return (
    <div>
      <Image url={url} width={width} height={height} className="object-cover" />
      <Typography.Text className="ml-6" italic>
        {description}
      </Typography.Text>
    </div>
  );
}

export default IdentityCard;
