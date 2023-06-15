import { S3UploadType } from '#/generated/schemas';
import useAsyncQuery from '#/shared/hooks/useAsyncQuery';

import { IMAGE_TYPES, USER_DEFAULT_IMAGE } from '#/shared/utils/constant';
import { showError, uploadFile } from '#/shared/utils/tools';

import { Avatar, AvatarProps, Upload, UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { useEffect, useState } from 'react';

interface Props {
  src?: string;
  onChange?: (url: string | Blob | File | undefined) => void;
  avatarProps?: AvatarProps;
}

function UploadAvatar({
  src,
  onChange,
  avatarProps,
  ...restProps
}: Props & UploadProps) {
  const [loading, setLoading] = useState(false);
  const { getPresignedUrl } = useAsyncQuery();
  const [file, setFile] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (src) setFile(src);
  }, [src]);

  const handleUpload = async ({
    file,
    onSuccess,
  }: {
    file: string | Blob | RcFile | File;
    onSuccess?: (body: string, xhr: XMLHttpRequest) => void;
  }) => {
    try {
      setLoading(true);
      if (!IMAGE_TYPES.split(',').includes((file as File).type)) {
        throw new Error('Định dạng tệp không hợp lệ. Vui lòng chọn lại!');
      }
      const { data } = await getPresignedUrl({
        fileName: (file as File).name,
        fileType: (file as File).type,
        pathType: S3UploadType.Public,
      });
      const uploadUrl = data?.presignedUrlS3?.uploadUrl;
      const url = `${import.meta.env.VITE_IMAGE_URL}/${data?.presignedUrlS3?.pathFile
        }`;

      if (uploadUrl) {
        const response = await uploadFile({
          file: file as Blob,
          signedRequest: uploadUrl,
        });
        onSuccess?.(response.statusText, file as unknown as XMLHttpRequest);
        onChange?.(url);
        setFile(url);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      showError(error);
    }
  };

  const onRemove = () => {
    onChange?.(undefined);
    setFile(undefined);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Upload
        customRequest={handleUpload}
        onRemove={onRemove}
        accept={IMAGE_TYPES}
        multiple={false}
        showUploadList={false}
        className="flex items-center"
        {...restProps}
      >
        <div className="absolute z-10 h-full w-full overflow-hidden rounded-full">
          <div className="relative flex h-full w-full items-end">
            <div className="h-3/6 w-full bg-black opacity-40" />
            <div className="absolute flex h-3/6 w-full items-center text-center justify-center text-xs font-medium">
              {'Click để tải lên ảnh'}
            </div>
          </div>
        </div>
        <Avatar
          size={avatarProps?.size ?? 90}
          src={
            loading
              ? '/src/assets/images/loading.gif'
              : file ?? USER_DEFAULT_IMAGE
          }
          {...avatarProps}
        />
      </Upload>
    </div>
  );
}

export default UploadAvatar;
