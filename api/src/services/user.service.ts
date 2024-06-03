// import fileService from './file.service';
import { PostgreSQL } from '@database';
import { password as passwrodHelper } from '@helpers';
import { logger } from '@utilities';
import { LoginResult, RegisterResult } from '@constants';
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
  createProfile,
  getUsersByRegexp,
  getProfilesByIDs,
} from '@/database/access';
import type { Account, Identity, SearchProfileData } from '@types';

async function login(
  email: Account['email'],
  password: Account['password'],
): Promise<Identity> {
  try {
    const query = await getUserByEmail(email);
    if (!query) return { user: null, message: LoginResult.NOT_EXIST };
    if (!(await passwrodHelper.compare(password, query.password)))
      return { user: null, message: LoginResult.INCORRECT_PASSWORD };
    return {
      user: {
        id: query.id,
        email: query.email,
        username: query.username,
      },
      message: LoginResult.SUCCESS,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

async function register(data: Account): Promise<Identity> {
  try {
    const queryEmail = await getUserByEmail(data.email);
    if (queryEmail) return { user: null, message: RegisterResult.EMAIL_EXISTS };

    const queryUsername = await getUserByUsername(data.username);
    if (queryUsername)
      return { user: null, message: RegisterResult.USERNAME_EXISTS };

    const result = await createUser(data);
    await createProfile(result.id);
    return {
      user: {
        id: result.id,
        email: result.email,
        username: result.username,
      },
      message: RegisterResult.SUCCESS,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

async function searchProfile(
  searchTerm: string,
): Promise<SearchProfileData[] | null> {
  const users = await getUsersByRegexp(searchTerm);
  if (!users) return null;
  const userIDs = users.map((user) => user.id);
  const profiles = await getProfilesByIDs(userIDs);
  if (!profiles) throw new Error('Profiles not found');

  const searchResult = users.map((user) => {
    return {
      id: user.id,
      username: user.username,
      avatar: profiles.find((profile) => profile.uid === user.id)?.avatar,
    };
  });
  return searchResult;
}

// async function setAvatar(uid: Account['id'], avatar: Express.Multer.File) {
//   const profile = (await ProfileModel.findOne({ uid }, 'avatar').catch(
//     (error: any) => {
//       logger.error(`${error}`, 'Account service');
//       return Promise.reject(error);
//     },
//   )) as ProfileDocument;
//   if (!profile) return Promise.reject('Profile not found');
//   if (!isEmptyObject(profile.avatar))
//     fileService.deleteImage(profile.avatar!.dataURL!);
//   const image = await fileService.addImage(avatar, uid);
//   if (image) {
//     profile.avatar = {
//       dataURL: image.secure_url,
//       sizeType: image.sizeType as 'landscape' | 'portrait',
//     };
//     await profile.save();
//     return profile.avatar;
//   }
//   return Promise.reject('Image upload failed');
// }

// async function removeAvatar(uid: Account['id']) {
//   const profile = (await ProfileModel.findOne({ uid }, 'avatar').catch(
//     (error: any) => {
//       return Promise.reject(error);
//     },
//   )) as ProfileDocument;
//   if (!profile) return Promise.reject('Profile not found');
//   if (isEmptyObject(profile.avatar)) return Promise.reject('No avatar found');
//   const success = await fileService.deleteImage(profile.avatar!.dataURL!);
//   if (success) {
//     await ProfileModel.updateOne({ uid }, { $unset: { avatar: '' } });
//     return true;
//   }
//   return Promise.reject('Image deletion failed');
// }

async function createAccount(
  email: Account['email'],
  password: Account['password'],
): Promise<Account> {
  try {
    const result = await PostgreSQL.one(
      `INSERT INTO accounts (email, password) VALUES ($(email), $(password)) RETURNING id, email`,
      { email, password },
    );
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}

// async function getUsernameByID(id: Account['id']): Promise<string> {
//   try {
//     const profile = (await ProfileModel.findOne({
//       uid: id,
//     }).exec()) as Profile | null;
//     if (!profile) return Promise.reject('Profile not found');
//     if (!profile.username) return Promise.reject('Username not found');
//     return profile.username;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }

async function getByID(id: Account['id']): Promise<Account> {
  try {
    const result = await PostgreSQL.oneOrNone(
      `SELECT * FROM accounts WHERE id = $(id)`,
      {
        id,
      },
    );
    if (!result) return Promise.reject('Account not found');
    return result;
  } catch (error) {
    logger.error(`${error}`, 'Account service');
    return Promise.reject(error);
  }
}

// async function getProfileByID(id: Profile['uid']): Promise<ProfileDocument> {
//   try {
//     const profile = (await ProfileModel.findOne({
//       uid: id,
//     }).exec()) as ProfileDocument | null;
//     if (!profile) return Promise.reject('Profile not found');
//     return profile;
//   } catch (error) {
//     logger.error(`${error}`, 'Account service');
//     return Promise.reject(error);
//   }
// }

// async function getFollowingsByID(id: Account['id']) {
//   try {
//     const profile = (await ProfileModel.findOne({
//       uid: id,
//     }).exec()) as ProfileDocument | null;
//     if (!profile) return Promise.reject('Profile not found');
//     return profile.followings;
//   } catch (error) {
//     logger.error(`${error}`, 'Account service');
//     return Promise.reject(error);
//   }
// }

// async function follow(uid: number, target: number) {
//   const profile = await ProfileModel.findOne({ uid }).exec();
//   profile?.followings!.push(target);
//   await profile?.save();
//   const targetProfile = await ProfileModel.findOne({ uid: target }).exec();
//   targetProfile?.followers!.push(uid);
//   await targetProfile?.save();
//   return profile;
// }

// async function unfollow(uid: number, target: number) {
//   const profile = await ProfileModel.findOne({ uid }).exec();
//   profile?.followings!.splice(profile?.followings!.indexOf(target), 1);
//   await profile?.save();
//   const targetProfile = await ProfileModel.findOne({ uid: target }).exec();
//   targetProfile?.followers!.splice(targetProfile?.followers!.indexOf(uid), 1);
//   await targetProfile?.save();
//   return profile;
// }

export default {
  login,
  register,
  searchProfile,

  // setAvatar,
  // removeAvatar,
  createAccount,
  getByID,
  // getProfileByID,
  // getUsernameByID,
  // getFollowingsByID,
  // follow,
  // unfollow,
};
