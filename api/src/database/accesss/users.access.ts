import { password } from '@helpers';
import { PostgreSQL } from '..';
import type { Account } from '@types';

export async function createUser(account: Account): Promise<Account> {
  try {
    const result = await PostgreSQL.one(
      `INSERT INTO users(email, username, password) VALUES($(email), $(username), $(password)) RETURNING *`,
      {
        ...account,
        password: await password.hash(account.password),
      },
    );
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getUserByEmail(
  email: Account['email'],
): Promise<Account | null> {
  try {
    const result = await PostgreSQL.oneOrNone(
      `SELECT * FROM users WHERE email = $(email)`,
      {
        email,
      },
    );
    if (!result) return null;
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getUserByUsername(
  username: Account['username'],
): Promise<Account | null> {
  try {
    const result = await PostgreSQL.oneOrNone(
      `SELECT * FROM users WHERE username = $(username)`,
      {
        username,
      },
    );
    if (!result) return null;
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}
