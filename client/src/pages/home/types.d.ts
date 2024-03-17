import { API, Post } from '@types';

interface HomePost extends Post {
  username?: string;
  avatar?: string;
}

export interface HomeAPI extends API {
  data: HomePost[];
}
