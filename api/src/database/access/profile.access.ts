import { ProfileModel } from '../models';
import type { Profile } from '@types';

export async function createProfile(uid: Profile['uid']): Promise<Profile> {
  try {
    const profile = new ProfileModel({ uid });
    await profile.save();
    return profile;
  } catch (error) {
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
    throw error;
  }
}
