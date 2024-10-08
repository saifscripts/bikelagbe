import avatar from '@/assets/avatar.gif';
import texture from '@/assets/texture.png';
import {
  useGetMeQuery,
  useUploadAvatarMutation,
} from '@/redux/features/user/userApi';
import { Loader2Icon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import UploadAvatarButton from './UploadAvatarButton';

export default function ProfileHeader() {
  const { data: user } = useGetMeQuery('');
  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();

  return (
    <div className="rounded-lg p-1 border">
      {/* Banner */}
      <div
        className="h-24 lg:h-32 w-full bg-foreground/90 rounded-lg text-background dark:text-foreground flex items-center justify-center relative p-6
         bg-cover bg-center border"
        style={{
          backgroundImage: `url(${texture})`,
        }}
      >
        {/* Banner Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-lg"></div>
        {/* Banner Text */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold relative z-10 w-1/2 text-center hidden xs:block">
          WELCOME
          <br />
          <span className="capitalize text-primary">{user?.name}</span>
        </h1>
        {/* Avatar */}
        <div
          className="absolute left-4 top-3 size-24 lg:size-32 ring-2 ring-background dark:ring-foreground rounded-full bg-contain bg-center bg-foreground/10"
          style={{
            backgroundImage: `url(${avatar})`,
          }}
        >
          <div
            className="absolute inset-0 size-24 lg:size-32 rounded-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${user?.avatarURL})`,
            }}
          ></div>
          <UploadAvatarButton
            uploadAvatar={uploadAvatar}
            isLoading={isLoading}
          />
          {isLoading && <AvatarLoader />}
        </div>
      </div>
      {/* User Info */}
      <div className="p-4">
        <h1 className="text-xl font-bold text-foreground/80 mb-2">
          {user?.name}
        </h1>

        {/* User Details */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <p className="text-sm text-foreground/70 flex items-center gap-2">
            <MailIcon className="size-4 inline-block" />
            {user?.email}
          </p>

          <p className="text-sm text-foreground/70 flex items-center gap-2">
            <PhoneIcon className="size-4 inline-block" />
            {user?.phone}
          </p>

          <p className="text-sm text-foreground/70 flex items-center gap-2">
            <MapPinIcon className="size-4 inline-block" />
            {user?.address}
          </p>
        </div>
      </div>
    </div>
  );
}

function AvatarLoader() {
  return (
    <div className="absolute inset-0 bg-black opacity-50 rounded-full flex items-center justify-center z-10">
      <Loader2Icon className="size-6 animate-spin text-background dark:text-foreground" />
    </div>
  );
}
