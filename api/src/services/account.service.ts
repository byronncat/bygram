const { authenticationDB } = require('@db');
import { Condition, Profile, UserToken } from '@types';

import { ProfileDocument, ProfileModel } from '@db/schema.mongodb';
import { logger, escapeRegExp, isEmptyObject } from '@utils';
import { Account, AuthenticationAPI, RegisterData } from '@types';
import fileService from './file.service';

// Postgresql database
async function loginAuthenticate(
  email: Account['email'],
  password: Account['password']
): Promise<AuthenticationAPI> {
  if (!password) return Promise.reject('Password is required');
  password = escapeRegExp(password);

  try {
    const result = await authenticationDB.oneOrNone(
      `SELECT * FROM accounts WHERE email = $(email)`,
      { email }
    );
    if (!result) return { user: null, message: 'No user found' };
    if (result.password !== password) return { user: null, message: 'Incorrect password' };
    delete result.password;
    result.username = await getUsernameByID(result.id);
    return { user: result, message: 'Logged in successfully' };
  } catch (error) {
    return Promise.reject(error);
  }
}

async function registerAuthenticate(email: Account['email']): Promise<AuthenticationAPI> {
  try {
    const result = await authenticationDB.oneOrNone(
      `SELECT * FROM accounts WHERE email = $(email)`,
      { email }
    );
    if (result && result.email === email) return { user: null, message: 'Email already exists' };
    return { user: { email }, message: 'Can register' };
  } catch (error) {
    return Promise.reject(error);
  }
}

async function register(data: RegisterData): Promise<UserToken> {
  if (data.email == undefined || data.password == undefined)
    return Promise.reject('Email and password are required');

  try {
    const { id, email } = await createAccount(data.email, data.password);
    const { username } = await createProfile({ uid: id, username: data.username });
    return { id, username, email };
  } catch (error) {
    return Promise.reject(error);
  }
}

async function setAvatar(uid: Account['id'], avatar: Express.Multer.File) {
  const profile = (await ProfileModel.findOne({ uid }, 'avatar').catch((error) => {
    logger.error(`${error}`, 'Account service');
    return Promise.reject(error);
  })) as ProfileDocument | null;
  if (!profile) return Promise.reject('Profile not found');
  if (!isEmptyObject(profile.avatar)) fileService.deleteImage(profile.avatar!.dataURL!);
  const image = await fileService.addImage(avatar, uid);
  if (image) {
    profile.avatar = {
      dataURL: image.secure_url,
      sizeType: image.sizeType as 'Landscape' | 'Portrait' | 'Square',
    };
    await profile.save();
    return profile.avatar;
  }
  return Promise.reject('Image upload failed');
}

async function removeAvatar(uid: Account['id']) {
  const profile = (await ProfileModel.findOne({ uid }, 'avatar').catch((error) => {
    return Promise.reject(error);
  })) as ProfileDocument | null;
  if (!profile) return Promise.reject('Profile not found');
  if (isEmptyObject(profile.avatar)) return Promise.reject('No avatar found');
  const success = await fileService.deleteImage(profile.avatar!.dataURL!);
  if (success) {
    await ProfileModel.updateOne({ uid }, { $unset: { avatar: '' } });
    return true;
  }
  return Promise.reject('Image deletion failed');
}

async function createAccount(
  email: Account['email'],
  password: Account['password']
): Promise<Account> {
  try {
    const result = await authenticationDB.one(
      `INSERT INTO accounts (email, password) VALUES ($(email), $(password)) RETURNING id, email`,
      { email, password }
    );
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function createProfile(data: Profile): Promise<ProfileDocument> {
  try {
    const profile = new ProfileModel(data);
    await profile.save();
    return profile;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getUsernameByID(id: Account['id']): Promise<string | null> {
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

async function getByID(id: Account['id']): Promise<Account | null> {
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

async function getProfileByID(id: Profile['uid']) {
  try {
    const profile = (await ProfileModel.findOne({ uid: id }).exec()) as ProfileDocument | null;
    if (!profile) return Promise.reject('Profile not found');
    return profile;
  } catch (error) {
    logger.error(`${error}`, 'Account service');
    return Promise.reject(error);
  }
}

async function getFollowingsByID(id: number) {
  try {
    const profile = (await ProfileModel.findOne({ uid: id }).exec()) as ProfileDocument | null;
    if (!profile) return Promise.reject('Profile not found');
    return profile.followings;
  } catch (error) {
    logger.error(`${error}`, 'Account service');
    return Promise.reject(error);
  }
}

async function searchProfile(searchTerm: string) {
  const profiles = await ProfileModel.find({
    username: { $regex: searchTerm, $options: 'i' },
  });
  const profiles2 = await ProfileModel.find({
    $text: { $search: searchTerm },
  });
  logger.warn(`${profiles} ${profiles2}`, 'Account service');
  return profiles;
}

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

export default {
  loginAuthenticate,
  registerAuthenticate,
  register,
  setAvatar,
  removeAvatar,
  createAccount,
  getByID,
  getProfileByID,
  getUsernameByID,
  getFollowingsByID,
  searchProfile,
  follow,
  unfollow,
  //
  create,
  get,
  createProfile,
  getName,
};
