import { AvatarProps, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react';
import { RcFile } from 'antd/es/upload';

import Avatar from './Avatar';
import useAsyncQuery from '#/shared/hooks/useAsyncQuery';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import { S3UploadType } from '#/generated/schemas';
import ImageDefault from '#/assets/images/imageDefault.png';
import { uploadFile } from '#/shared/utils/tools';

interface Props {
  onChange?: (url: string) => void;
  disabled?: boolean;
  src?: string;
}

function UploadImage({
  onChange,
  disabled,
  src,
  size = 100,
  ...rest
}: Props & AvatarProps) {
  const { getPresignedUrl } = useAsyncQuery();
  const [imageURL, setImageURL] = useState<string | undefined>(src);
  useEffect(() => {
    setImageURL(src);
  }, [src]);
  const handleUpload = async ({
    file,
  }: {
    file: string | Blob | RcFile | File;
  }) => {
    const { data } = await getPresignedUrl({
      fileName: (file as File).name,
      fileType: (file as File).type,
      pathType: S3UploadType.Profile,
    });

    const uploadUrl = data?.presignedUrlS3?.uploadUrl;
    const url = `${import.meta.env.VITE_IMAGE_URL}/${
      data?.presignedUrlS3?.pathFile
    }`;
    if (uploadUrl) {
      await uploadFile({
        file: file as Blob,
        signedRequest: uploadUrl,
      });

      onChange?.(url);
      setImageURL(url);
    }
  };

  return (
    <ImgCrop grid shape="round">
      <Upload
        accept="image/*"
        customRequest={handleUpload}
        showUploadList={false}
        disabled={disabled}
        maxCount={1}
        progress={{
          strokeWidth: 4,
          showInfo: false,
        }}
        className="flex justify-center"
      >
        <div className="flex rounded-full">
          {imageURL ? (
            <Avatar src={imageURL} size={size} alt="image" {...rest} />
          ) : (
            <img
              src={ImageDefault}
              alt="avatar"
              className="mr-10 h-[7.25rem] w-[7.5rem] object-cover"
            />
          )}
        </div>
      </Upload>
    </ImgCrop>
  );
}

export default UploadImage;
