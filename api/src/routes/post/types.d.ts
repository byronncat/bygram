import { PostData } from '@services/types';
import { API } from '@types';

export interface HomeAPI extends API {
  data: PostData[];
}
