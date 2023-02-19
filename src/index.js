//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 3000;

const Koa = require("koa");
const Router = require("koa-router");
const routes = require("./router/user.router.js");
const bodyParse = require("koa-bodyparser");
const koaJson = require("koa-json");
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
// const convert = require("koa-convert");

const koa = new Koa();
koa.use(routes.routes());
koa.use(bodyParse());
koa.use(koaJson());
// koa.use(swaggerUi.serve);
// koa.use(swaggerUi.setup(swaggerDocument));
var router = new Router();

// Configuração do Swagger
// const swaggerOptions = {
//   definition: {
//     info: {
//       title: "API para teste da ozmap",
//       description: "Api em Koajs, para cadastrado de usuários",
//       version: "1.0.0",
//     },
//     servers: [
//       {
//         url: "http://localhost:3000/api-docs",
//       },
//     ],
//   },
//   apis: ["./routes/*.js"], // Caminho para seus arquivos de rota
// };

// const swaggerDocs = swaggerJsdoc(swaggerOptions);
// const swaggerDocument = swaggerDocs;

// Rota Swagger
// router.use("/api-docs", convert(swaggerUi.serve));
// router.get("/api-docs", convert(swaggerUi.setup(swaggerDocs)));

//rota simples pra testar se o servidor está online
router.get("/", async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

//Uma rota de exemplo simples aqui.
//As rotas devem ficar em arquivos separados, /src/controllers/userController.js por exemplo
router.get("/users", async (ctx) => {
  ctx.status = 200;
  ctx.body = { total: 0, count: 0, rows: [] };
});

router.post("/users", async (ctx) => {
  const { name, email, password } = ctx.request.body; // desestruturar os dados da requisição
  console.log(name, email, password); // verificar os dados recebidos

  ctx.body = "User created!";
});

koa.use(router.routes()).use(router.allowedMethods());

const server = koa.listen(PORT);

module.exports = server;
