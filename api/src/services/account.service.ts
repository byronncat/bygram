const { accountDB } = require('../db/index');
import { AccountSchema } from '@/type';

function parseQuery(data: AccountSchema) {
  const idQuery = data.id ? `id = '${data.id}'` : '';
  const usernameQuery = data.username ? `username LIKE '${data.username}'` : '';
  const emailQuery = data.email ? `email = '${data.email}'` : '';
  const passwordQuery = data.password ? `password LIKE '${data.password}'` : '';

  const conditions = [idQuery, usernameQuery, emailQuery, passwordQuery].filter((query) => query !== '').join(' OR ');
  return conditions;
};

async function getAllUsers() {
  try {
    const result = await accountDB.any(`SELECT * FROM accounts.users`);
    return result;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

async function getUsers(data: AccountSchema) {
  try {
    const conditions = parseQuery(data);
    const query = `SELECT * FROM accounts.users WHERE ${conditions}`;
    const result = await accountDB.any(query);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

async function verifyUser(data: AccountSchema) {
  try {
    const query = `SELECT * FROM accounts.users WHERE username LIKE '${data.username}' AND password LIKE '${data.password}'`;
    const result = await accountDB.oneOrNone(query);
    return result;
  } catch (error) {
    // throw error;
    return Promise.reject(error);
  }
};

async function addUser(data: AccountSchema) {
  try {
    const result = await accountDB.one(`INSERT INTO accounts.users (username, email, password) VALUES ($1, $2, $3) RETURNING id`, [data.username, data.email, data.password]);
    return result;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

async function getUsernameById(id: number) {
  try {
    const result = await accountDB.one(`SELECT username FROM accounts.users WHERE id = $1`, id);
    return result;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

module.exports = {
  getAllUsers,
  getUsers,
  getUsernameById,
  verifyUser,
  addUser,
};