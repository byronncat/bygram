const { accountDB } = require('../db/index');
import { AccountSchema } from '@/type';

function parseQuery(data: AccountSchema) {
  const idQuery = data.id ? `id = '${data.id}'` : '';
  const usernameQuery = data.username ? `username = '${data.username}'` : '';
  const emailQuery = data.email ? `email = '${data.email}'` : '';
  const passwordQuery = data.password ? `password = '${data.password}'` : '';

  const conditions = [idQuery, usernameQuery, emailQuery, passwordQuery].filter((query) => query !== '').join(' OR ');
  return conditions;
};

async function getAllUsers() {
  try {
    const result = await accountDB.any(`SELECT * FROM accounts.users`);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

async function getUsers(data: AccountSchema) {
  try {
    const conditions = parseQuery(data);
    const query = `SELECT * FROM accounts.users WHERE ${conditions}`;
    const result = await accountDB.any(query);
    return result;
  } catch (error) {
    return error;
  }
};

async function verifyUser(data: AccountSchema) {
  try {
    const query = `SELECT * FROM accounts.users WHERE username = '${data.username}' AND password = '${data.password}'`;
    const result = await accountDB.oneOrNone(query);
    return result;
  } catch (error) {
    return error;
  }
};

async function addUser(data: AccountSchema) {
  try {
    const result = await accountDB.none(`INSERT INTO accounts.users (username, email, password) VALUES ($1, $2, $3)`, [data.username, data.email, data.password]);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getAllUsers,
  getUsers,
  verifyUser,
  addUser,
};