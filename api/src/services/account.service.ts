const { accountDB } = require("@db");
import { IAccount, ICondition, IProfile } from "@/type";

// Postgresql database
async function get(data: IAccount, conditions?: ICondition) {
  try {
    const query = parseQuery(data, conditions);
    console.log(query, data);
    const result: IAccount[] = await accountDB.any(query, data);
    if (result.length === 0) {
      return null;
    }
    if (conditions?.one) {
      return result[0] as IAccount;
    } else {
      return result as IAccount[];
    }
  } catch (error) {
    console.log(`[Account service]: Read method error - ${error}`);
    return Promise.reject(error);
  }
}

async function create(data: IAccount) {
  try {
    const result = await accountDB.one(
      `INSERT INTO accounts.users (username, email, password) VALUES ($(username), $(email), $(password)) RETURNING id`,
      data
    );
    return result as IAccount;
  } catch (error) {
    console.log(`[Account service]: Create method error - ${error}`);
    return Promise.reject(error);
  }
}

function parseQuery(data: IAccount, conditions?: ICondition) {
  // Be careful with type number (data.id = 0 => false)
  const idQuery = "id" in data ? `id = $(id)` : "";
  const usernameQuery = "username" in data ? `username = $(username)` : "";
  const emailQuery = "email" in data ? `email = $(email)` : "";
  const passwordQuery = "password" in data ? `password LIKE $(password)` : "";

  let condition = "";
  if (conditions) {
    if (conditions.and) condition = " AND ";
    if (conditions.or) condition = " OR ";
  }

  let query = [idQuery, usernameQuery, emailQuery, passwordQuery]
    .filter((query) => query !== "")
    .join(condition);
  query = `SELECT * FROM accounts.users WHERE ${query}`;
  return query;
}

// MongoDB
// Social media profile
import mongoose, { Document } from "mongoose";

interface ProfileDocument extends IProfile, Document {
  _doc?: IProfile;
}

const Profile = mongoose.model(
  "profile",
  new mongoose.Schema<ProfileDocument>({
    uid: { type: Number, required: true },
    avatar: { type: String, required: true },
  })
);

async function readProfile(id: number) {
  const profile = await Profile.findOne({ uid: id }).exec();
  return profile!;
}

export default {
  create,
  get,
  readProfile,
};
