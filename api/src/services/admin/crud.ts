const { PostgreSQL: db } = require("../../db/index");

interface Admin {
  id: number;
  username: string;
  password: string;
}

module.exports.getAdmins = async function (): Promise<Admin[]> {
  const data = await db.any('SELECT * FROM accounts.admin');
  return data;
}

module.exports.getAdmin = async function (id: number): Promise<Admin> {
  const data = await db.one('SELECT * FROM accounts.admin WHERE id = $1', id);
  return data;
}

module.exports.createAdmin = async function (admin: Admin): Promise<Admin> {
  const data = await db.one('INSERT INTO accounts.admin (username, password) VALUES ($1, $2) RETURNING *', [admin.username, admin.password]);
  return data;
}

module.exports.updateAdmin = async function (admin: Admin): Promise<Admin> {
  const data = await db.one('UPDATE accounts.admin SET username = $1, password = $2 WHERE id = $3 RETURNING *', [admin.username, admin.password, admin.id]);
  return data;
}

module.exports.deleteAdmin = async function (id: number): Promise<Admin> {
  const data = await db.one('DELETE FROM accounts.admin WHERE id = $1 RETURNING *', id);
  return data;
}