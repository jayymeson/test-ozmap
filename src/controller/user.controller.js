const db = require("../database/db.js");

const userController = {
  async getAllUsers(ctx) {
    const sql = "SELECT * FROM users";
    try {
      const rows = await db.all(sql);
      const total = rows.length;
      ctx.body = { total, rows };
      console.log(rows);
    } catch (err) {
      ctx.status = 500;
      ctx.body = { message: err.message };
    }
  },

  async getUserById(ctx) {
    const { id } = ctx.params;
    const sql = "SELECT * FROM users WHERE id = ?";
    try {
      const row = await db.get(sql, id);
      if (!row) {
        ctx.status = 404;
        ctx.body = { message: `Usuário com id ${id} não encontrado.` };
      } else {
        ctx.body = row;
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = { message: err.message };
    }
  },

  async createUser(ctx) {
    const { name, email, password } = ctx.request.body || {};
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    try {
      const result = await db.run(sql, name, email, password);
      ctx.status = 201;
      ctx.body = { id: result.lastID };
    } catch (err) {
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  },

  async updateUser(ctx) {
    const { id } = ctx.params;
    const { name, email, password } = ctx.request.body || {};
    const sql =
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
    try {
      const result = await db.run(sql, name, email, password, id);
      if (result.changes === 0) {
        ctx.status = 404;
        ctx.body = { message: `Usuário com id ${id} não encontrado.` };
      } else {
        ctx.status = 200;
        ctx.body = { message: `Usuário com id ${id} atualizado com sucesso.` };
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  },

  async deleteUser(ctx) {
    const { id } = ctx.params;
    const sql = "DELETE FROM users WHERE id = ?";
    try {
      const result = await db.run(sql, id);
      if (result.changes === 0) {
        ctx.status = 404;
        ctx.body = { message: `Usuário com id ${id} não encontrado.` };
      } else {
        ctx.status = 204;
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = { message: err.message };
    }
  },
};

module.exports = userController;
