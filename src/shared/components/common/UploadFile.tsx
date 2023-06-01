import { Typography, Upload, UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { useEffect, useState } from 'react';
import {
  CloseCircleOutlined,
  DeleteFilled,
  FileFilled,
  ToTopOutlined,
} from '@ant-design/icons';
import PrimaryButton from '../Styled/PrimaryButton';
import useAsyncQuery from '#/shared/hooks/useAsyncQuery';

import { S3UploadType } from '#/generated/schemas';

import {
  getFileNameFromUrl,
  showError,
  uploadFile,
} from '#/shared/utils/tools';
import { Doc } from '#/assets/svg';
import { DEFAULT_UPLOAD_TYPE } from '#/shared/utils/constant';

interface Props {
  src?: string | null;
  onChange?: (url?: string) => void;
  isEdit?: boolean;
}

function UploadFile({
  src,
  onChange,
  accept,
  isEdit,
  ...restProps
}: Props & UploadProps) {
  const [loading, setLoading] = useState(false);
  const { getPresignedUrl } = useAsyncQuery();
  const [file, setFile] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (src) setFile(src);
  }, [setFile, src]);

  const handleUpload = async ({
    file,
    onSuccess,
  }: {
    file: string | Blob | RcFile | File;
    onSuccess?: (body: string, xhr: XMLHttpRequest) => void;
  }) => {
    try {
      setLoading(true);
      if ((file as File)?.name?.length > 255) {
        throw new Error('Tên tệp quá dài. Vui lòng đổi tên tệp và thử lại!');
      }
      if (!DEFAULT_UPLOAD_TYPE.split(',').includes((file as File).type)) {
        throw new Error('Định dạng tệp không hợp lệ. Vui lòng thử lại!');
      }
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
    <div className="flex flex-col gap-3">
      {file &&
        (isEdit ? (
          <>
            <div className="relative flex h-[80px] w-[80px] items-center justify-center rounded-lg border-2 bg-color-gray bg-opacity-25">
              <div className="flex items-center gap-16">
                <a href={file} target="_blank" rel="noreferrer">
                  <Doc width={20} height={24} />
                </a>
              </div>
              <CloseCircleOutlined
                className="absolute top-[-0.7rem] right-[-0.6rem] text-color-gray"
                onClick={onRemove}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center text-base">
            <div className="flex items-center gap-16">
              <a
                href={file}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white"
              >
                <FileFilled />
                {getFileNameFromUrl(file)}
              </a>
              <DeleteFilled className="text-primary-color" onClick={onRemove} />
            </div>
          </div>
        ))}
      <Upload
        customRequest={handleUpload}
        onRemove={onRemove}
        showUploadList={false}
        multiple={false}
        className="flex items-center"
        accept={accept ?? DEFAULT_UPLOAD_TYPE}
        {...restProps}
      >
        {isEdit &&
          (!file ? (
            <div className="flex h-[80px] w-[80px]  items-center justify-center rounded-lg border-2 border-dashed bg-color-gray bg-opacity-25">
              <ToTopOutlined width={45} height={30} />
            </div>
          ) : (
            <></>
          ))}
        {!isEdit && (
          <div className="border-disabled-color flex items-center justify-center text-color-gray">
            <PrimaryButton loading={loading}>{'Tải lên'}</PrimaryButton>
          </div>
        )}
      </Upload>
    </div>
  );
}

export default UploadFile;
