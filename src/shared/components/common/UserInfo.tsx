import { Avatar, Typography } from 'antd';

import DefaultAvatar from '#/assets/images/avatar.png';

import { IUser } from '#/generated/schemas';
import { DeepPartial } from '#/shared/utils/type';

interface UserInfoProps {
  user?: DeepPartial<IUser>;
  size?: number;
}

export default function UserInfo({ user, size = 100 }: UserInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar src={user?.avatar ?? DefaultAvatar} size={size} />
      <div className="flex flex-col justify-center gap-2">
        <Typography className="text-base font-bold">
          {`${user?.firstName} ${user?.lastName}` ?? 'N/A'}
        </Typography>
        <Typography>{user?.email}</Typography>
      </div>
    </div>
  );
}
