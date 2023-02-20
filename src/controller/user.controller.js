const { db, getAllUsers, getUserById } = require("../database/db.js");
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
    const { name, email, password, img } = ctx.request.body || {};

    // Definir o schema de validação
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      img: Joi.string().required(),
    });

    // Validar os dados da requisição com base no schema
    const { error, value } = schema.validate({ name, email, password, img });
    if (error) {
      ctx.status = 400;
      ctx.body = { message: error.details[0].message };
      return;
    }

    // Inserir os dados no banco de dados
    const sql = "INSERT INTO users (name, email, password, img) VALUES (?, ?, ?, ?)";
    try {
      const result = await db.run(sql, value.name, value.email, value.password, value.img);
      ctx.status = 201;
      ctx.body = { id: result.lastID };
    } catch (err) {
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  },

  async updateUser(ctx) {
    const { id } = ctx.params;
    const { name, email, password, img } = ctx.request.body || {};
    const sql =
      "UPDATE users SET name = ?, email = ?, password = ?, img = ? WHERE id = ?";
    try {
      const result = await db.run(sql, name, email, password, img, id);
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
