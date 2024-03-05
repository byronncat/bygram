const { accountDB } = require('@db');
import { Account, Condition, Profile } from '@/type';

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

interface ProfileDocument extends Profile, Document {
  _doc?: Profile;
}

const Profile = mongoose.model(
  'profile',
  new mongoose.Schema<ProfileDocument>(
    {
      uid: { type: Number, required: true },
      avatar: { type: String },
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

export default {
  create,
  get,
  createProfile,
  getProfile,
};
