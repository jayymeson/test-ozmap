const { db, getAllUsers, getUserById } = require("../database/db.js");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const userController = {
  async getAllUsers(ctx) {
    try {
      const users = await getAllUsers();
      ctx.response.status = 200;
      ctx.body = { users };
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = { error: err.message };
    }
  },

  async getUserById(ctx) {
    const { id } = ctx.params;
    try {
      const user = await getUserById(id);
      if (!user) {
        ctx.status = 404;
        ctx.body = { message: `Usuário com id ${id} não encontrado.` };
      } else {
        ctx.body = user;
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = { message: err.message };
    }
  },

  async createUser(ctx) {
    const { name, email, password, img, description } = ctx.request.body || {};
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      img: Joi.string().required(),
      description: Joi.string().required(),
    });
    const { error, value } = schema.validate({
      name,
      email,
      password,
      img,
      description,
    });
    if (error) {
      ctx.status = 400;
      ctx.body = { message: error.details[0].message };
      return;
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);

    const sql =
      "INSERT INTO users (name, email, password, img, description) VALUES (?, ?, ?, ?, ?)";
    try {
      const result = await db.run(
        sql,
        value.name,
        value.email,
        hashedPassword,
        value.img,
        value.description
      );
      ctx.status = 201;
      ctx.body = { id: result.lastID };
    } catch (err) {
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  },

  async updateUser(ctx) {
    const { id } = ctx.params;
    const { name, email, password, img, description } = ctx.request.body || {};
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "UPDATE users SET name = ?, email = ?, password = ?, img = ?, description = ? WHERE id = ?";
    try {
      const result = await db.run(
        sql,
        name,
        email,
        hashedPassword,
        img,
        description,
        id
      );
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
        ctx.status = 200;
        ctx.body = { message: `Usuário com id ${id} excluído.` };
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = { message: err.message };
    }
  },
};

module.exports = userController;
