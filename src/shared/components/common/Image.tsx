import { Image as AntdImage, ImageProps } from 'antd';
import ImageDefault from '#/assets/images/imageDefault.png';
import Loading from './Loading';

interface Props {
  url: string | undefined;
}

function Image({ url, ...rest }: Props & ImageProps) {
  return (
    <AntdImage src={url ?? ImageDefault} placeholder={<Loading />} {...rest} />
  );
}

export default Image;
