const { authenticationDB, fileDB } = require('@db');
import { Condition, Profile } from '@types';
import { CloudinaryCreateResponse } from '@db/types';

import { ProfileModel } from '@db/schema.mongodb';
import { logger, escapeRegExp } from '@utils';
import { Account, Credentials } from '@types';
import { AuthenticationPassport, RegisterData } from './types';

// Postgresql database
async function loginAuthenticate(email: string, password: string): Promise<AuthenticationPassport> {
  password = escapeRegExp(password);
  try {
    const result = await authenticationDB.oneOrNone(
      `SELECT * FROM accounts WHERE email = $(email)`,
      { email }
    );
    if (!result) return { user: null, message: 'No user found' };
    if (result.password !== password) return { user: null, message: 'Incorrect password' };
    delete result.password;
    return { user: result, message: 'Logged in successfully' };
  } catch (error) {
    logger.error(`${error}`, 'Account service');
    return Promise.reject(error);
  }
}

async function registerAuthenticate(email: string): Promise<AuthenticationPassport> {
  try {
    const result = await authenticationDB.oneOrNone(
      `SELECT * FROM accounts WHERE email = $(email)`,
      { email }
    );
    if (result) if (result.email === email) return { user: null, message: 'Email already exists' };
    return { user: { email }, message: 'Can register' };
  } catch (error) {
    logger.error(`${error}`, 'Account service');
    return Promise.reject(error);
  }
}

async function register(data: RegisterData) {
  if (data.email == undefined || data.password == undefined) {
    return Promise.reject('Email and password are required');
  }
  try {
    const { id, email } = await createAccount(data.email, data.password);
    const { username } = await createProfile({ uid: id, username: data.username });
    return { id, username, email } as Credentials;
  } catch (error) {
    logger.error(`${error}`, 'Account service');
    return Promise.reject(error);
  }
}

async function createAccount(email: string, password: string): Promise<Account> {
  try {
    const result = await authenticationDB.one(
      `INSERT INTO accounts (email, password) VALUES ($(email), $(password)) RETURNING id`,
      { email, password }
    );
    return result;
  } catch (error) {
    logger.error(`${error}`, 'Account service');
    return Promise.reject(error);
  }
}

async function createProfile(data: Profile) {
  try {
    const profile = new ProfileModel(data);
    await profile.save();
    return profile;
  } catch (error) {
    logger.error(`${error}`, 'Account service');
    return Promise.reject(error);
  }
}

async function getUsernameByID(id: number): Promise<string | null> {
  try {
    const profile = (await ProfileModel.findOne({
      uid: id,
    }).exec()) as Profile | null;
    if (!profile) return Promise.reject('Profile not found');
    return profile.username!;
  } catch (error) {
    logger.error(`${error}`, 'Account service');
    return Promise.reject(error);
  }
}

async function getByID(id: number): Promise<Account | null> {
  try {
    const result = await authenticationDB.oneOrNone(`SELECT * FROM accounts WHERE id = $(id)`, {
      id,
    });
    if (!result) return Promise.reject('Account not found');
    return result;
  } catch (error) {
    logger.error(`${error}`, 'Account service');
    return Promise.reject(error);
  }
}

async function getProfileByID(id: any) {
  try {
    const profile = (await ProfileModel.findOne({ uid: id }).exec()) as Profile | null;
    if (!profile) return Promise.reject('Profile not found');
    return profile;
  } catch (error) {
    logger.error(`${error}`, 'Account service');
    return Promise.reject(error);
  }
}

async function getFollowings(id: number) {
  try {
    const profile = (await ProfileModel.findOne({ uid: id }).exec()) as Profile | null;
    if (!profile) return Promise.reject('Profile not found');
    return profile.followings;
  } catch (error) {
    logger.error(`${error}`, 'Account service');
    return Promise.reject(error);
  }
}

// No filter

async function get(data: any, conditions?: Condition) {
  try {
    const query = parseQuery(data, conditions);
    const result = await authenticationDB.any(query, data);
    if (result.length === 0) {
      return null;
    }
    if (conditions?.one) {
      return result[0];
    } else {
      return result;
    }
  } catch (error) {
    console.log(`[Account service]: Read method error - ${error}`);
    return Promise.reject(error);
  }
}

async function create(data: Account) {
  try {
    const result = await authenticationDB.one(
      `INSERT INTO accounts (username, email, password) VALUES ($(username), $(email), $(password)) RETURNING id`,
      data
    );
    return result as Account;
  } catch (error) {
    console.log(`[Account service]: Create method error - ${error}`);
    return Promise.reject(error);
  }
}

function parseQuery(data: Account, conditions?: Condition) {
  // Be careful with type number (data.id = 0 => false)
  const idQuery = 'id' in data ? `id = $(id)` : '';
  const usernameQuery = 'username' in data ? `username = $(username)` : '';
  const emailQuery = 'email' in data ? `email = $(email)` : '';
  const passwordQuery = 'password' in data ? `password LIKE $(password)` : '';

  let condition = '';
  if (conditions) {
    if (conditions.and) condition = ' AND ';
    if (conditions.or) condition = ' OR ';
  }

  let query = [idQuery, usernameQuery, emailQuery, passwordQuery]
    .filter((query) => query !== '')
    .join(condition);
  query = `SELECT * FROM accounts WHERE ${query}`;
  return query;
}

// MongoDB
// Social media profile

async function getName(id: number) {
  const profile = await ProfileModel.findOne({ uid: id }).exec();
  return profile?.username;
}

// async function setAvatar(id: number, avatar: Express.Multer.File) {
//   const base64String = Buffer.from(avatar.buffer).toString('base64');
//   const dataURL = `data:${avatar.mimetype};base64,${base64String}`;
//   const profile = await ProfileModel.findOne({ uid: id }).exec();
//   if (profile) {
//     if (profile.avatar) {
//       await fileDB.destroy(getPublicId(profile.avatar!));
//     }

//     await fileDB
//       .upload(dataURL, { folder: `social-media-app/${id}` })
//       .then((result: CloudinaryCreateResponse) => {
//         profile.avatar = result.secure_url;
//         profile.save();
//       })
//       .catch((error: any) => {
//         console.log(`[Cloudinary Error]: ${error}`);
//         return Promise.reject(error);
//       });
//     return profile.avatar;
//   }
//   return Promise.reject("Profile doesn't exist");
// }

async function follow(uid: number, target: number) {
  const profile = await ProfileModel.findOne({ uid }).exec();
  profile?.followings!.push(target);
  await profile?.save();
  const targetProfile = await ProfileModel.findOne({ uid: target }).exec();
  targetProfile?.followers!.push(uid);
  await targetProfile?.save();
  return profile;
}

async function unfollow(uid: number, target: number) {
  const profile = await ProfileModel.findOne({ uid }).exec();
  profile?.followings!.splice(profile?.followings!.indexOf(target), 1);
  await profile?.save();
  const targetProfile = await ProfileModel.findOne({ uid: target }).exec();
  targetProfile?.followers!.splice(targetProfile?.followers!.indexOf(uid), 1);
  await targetProfile?.save();
  return profile;
}

async function search(searchTerm: string) {
  const profiles = await ProfileModel.find({
    name: { $regex: searchTerm, $options: 'i' },
  }).exec();
  return profiles;
}

export default {
  loginAuthenticate,
  registerAuthenticate,
  register,
  createAccount,
  getProfileByID,
  getUsernameByID,
  getByID,
  //
  create,
  get,
  createProfile,
  getName,
  // setAvatar,
  follow,
  unfollow,
  getFollowings,
  search,
};
