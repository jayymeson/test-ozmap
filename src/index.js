//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables

const Koa = require("koa");
const routes = require("./router/user.router.js");
const bodyParse = require("koa-bodyparser");
const koaJson = require("koa-json");
const cors = require("koa-cors");
const dotenv = require("dotenv");
require("dotenv").config();

const koa = new Koa();
koa.use(bodyParse());
koa.use(koaJson());
koa.use(cors());
koa.use(routes.routes());

dotenv.config();

const PORT = process.env.PORT;

koa.use(async (ctx) => {
  if (ctx.status === 404) {
    ctx.status = 200;
    ctx.body = "Bem-vindo ao servidor";
  }
});

const server = koa.listen(PORT, () => {
  console.log(`Seu servidor esta rodando em http://localhost:${PORT}`);
});

module.exports = server;
