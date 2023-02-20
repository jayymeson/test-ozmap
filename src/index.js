//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables

const Koa = require("koa");
const routes = require("./router/user.router.js");
const bodyParse = require("koa-bodyparser");
const koaJson = require("koa-json");
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
// const convert = require("koa-convert");

const koa = new Koa();
koa.use(bodyParse());
koa.use(koaJson());

koa.use(routes.routes());

const PORT = process.env.PORT || 3000;

const server = koa.listen(PORT, () => {
  console.log(`Seu servidor esta rodando em http://localhost:${PORT}`);
});

module.exports = server;
