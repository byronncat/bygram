import { ProfileModel } from '../models';
import type { Profile } from '@types';

export async function createProfile(uid: Profile['uid']): Promise<Profile> {
  try {
    const profile = new ProfileModel({ uid });
    await profile.save();
    return profile;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getProfilesByIDs(
  ids: Profile['uid'][],
): Promise<Profile[] | null> {
  try {
    const profiles = await ProfileModel.find({ uid: { $in: ids } }).exec();
    if (!profiles) return null;
    return profiles;
  } catch (error) {
    return Promise.reject(error);
  }
}
