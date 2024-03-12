const { accountDB, postImageDB } = require('@db');
import { Account, Condition, Profile } from '@/type';
import { CloudinaryApiResponse } from '@db/db';
import { getPublicId } from '@utils';

// Postgresql database
async function get(data: Account, conditions?: Condition) {
  try {
    const query = parseQuery(data, conditions);
    const result: Account[] = await accountDB.any(query, data);
    if (result.length === 0) {
      return null;
    }
    if (conditions?.one) {
      return result[0] as Account;
    } else {
      return result as Account[];
    }
  } catch (error) {
    console.log(`[Account service]: Read method error - ${error}`);
    return Promise.reject(error);
  }
}

async function create(data: Account) {
  try {
    const result = await accountDB.one(
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
import mongoose, { Document } from 'mongoose';
import accountService from './account.service';

interface ProfileDocument extends Profile, Document {
  _doc?: Profile;
}

const Profile = mongoose.model(
  'profile',
  new mongoose.Schema<ProfileDocument>(
    {
      uid: { type: Number, required: true },
      name: { type: String, required: true },
      followers: { type: [Number], default: [], required: true },
      followings: { type: [Number], default: [], required: true },
      avatar: { type: String },
      description: { type: String },
    },
    {
      versionKey: false,
    }
  )
);

async function createProfile(data: Profile) {
  try {
    const profile = new Profile(data);
    await profile.save();
    return profile;
  } catch (error) {
    console.log(`[Profile service]: Create method error - ${error}`);
    return Promise.reject(error);
  }
}

async function getProfile(id: number) {
  const profile = await Profile.findOne({ uid: id }).exec();
  return profile!;
}

async function getName(id: number) {
  const profile = await Profile.findOne({ uid: id }).exec();
  return profile?.name;
}

async function getFollowings(id: number) {
  const profile = await Profile.findOne({ uid: id }).exec();
  return profile?.followings;
}

async function setAvatar(id: number, avatar: Express.Multer.File) {
  const base64String = Buffer.from(avatar.buffer).toString('base64');
  const dataURL = `data:${avatar.mimetype};base64,${base64String}`;
  const profile = await Profile.findOne({ uid: id }).exec();
  if (profile) {
    if (profile.avatar) {
      await postImageDB.uploader.destroy(getPublicId(profile.avatar!));
    }

    await postImageDB.uploader
      .upload(dataURL, { folder: `social-media-app/${id}` })
      .then((result: CloudinaryApiResponse) => {
        profile.avatar = result.secure_url;
        profile.save();
      })
      .catch((error: any) => {
        console.log(`[Cloudinary Error]: ${error}`);
        return Promise.reject(error);
      });
    return profile.avatar;
  }
  return Promise.reject("Profile doesn't exist");
}

async function follow(uid: number, target: number) {
  const profile = await Profile.findOne({ uid }).exec();
  profile?.followings!.push(target);
  await profile?.save();
  const targetProfile = await Profile.findOne({ uid: target }).exec();
  targetProfile?.followers!.push(uid);
  await targetProfile?.save();
  return profile;
}

async function unfollow(uid: number, target: number) {
  const profile = await Profile.findOne({ uid }).exec();
  profile?.followings!.splice(profile?.followings!.indexOf(target), 1);
  await profile?.save();
  const targetProfile = await Profile.findOne({ uid: target }).exec();
  targetProfile?.followers!.splice(targetProfile?.followers!.indexOf(uid), 1);
  await targetProfile?.save();
  return profile;
}

export default {
  create,
  get,
  createProfile,
  getProfile,
  getName,
  setAvatar,
  follow,
  unfollow,
  getFollowings,
};
