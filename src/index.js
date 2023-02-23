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
require("dotenv").config();
const swaggerUi = require("swagger-ui-koa");


const koa = new Koa();
koa.use(bodyParse());
koa.use(koaJson());
koa.use(cors());


koa.use(routes.routes());

const PORT = process.env.PORT;

const server = koa.listen(PORT, () => {
  console.log(`Seu servidor esta rodando em http://localhost:${PORT}`);
});

routes.get('/', async (ctx, next) => {
  ctx.body = 'Bem-vindo ao meu servidor';
});

module.exports = server;
