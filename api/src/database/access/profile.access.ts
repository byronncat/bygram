import { logger } from '@utilities';
import { ProfileModel } from '../models';
import type { Profile } from '@types';

export async function createProfile(uid: Profile['uid']): Promise<Profile> {
  try {
    const profile = new ProfileModel({ uid });
    await profile.save();
    return profile;
  } catch (error) {
    logger.error(JSON.stringify(error), 'Profile Access (Create Profile)');
    throw error;
  }
}

export async function getProfileByID(
  uid: Profile['uid'],
): Promise<Profile | null> {
  try {
    const profile = await ProfileModel.findOne({ uid }).exec();
    return profile ? profile.toObject() : null;
  } catch (error) {
    logger.error(JSON.stringify(error), 'Profile Access (Get Profile By ID)');
    throw error;
  }
}

export async function getProfilesByIDs(
  ids: Profile['uid'][],
): Promise<Profile[] | null> {
  try {
    const profiles = await ProfileModel.find({ uid: { $in: ids } }).exec();
    if (profiles.length === 0) return null;
    return profiles;
  } catch (error) {
    logger.error(JSON.stringify(error), 'Profile Access (Get Profiles By IDs)');
    throw error;
  }
}
