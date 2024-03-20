import { Profile } from '@types';

interface DetailedProfileAPI extends API {
  data: Profile;
}

interface AvatarAPI extends API {
  data: Profile['avatar'];
}
