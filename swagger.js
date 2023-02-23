const Koa = require("koa");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = require("../swagger.js");
const SwaggerUI = require("swagger-ui");
const swaggerJSDoc = require("swagger-jsdoc");

const koa = new Koa();

const swaggerDefinition = {
  info: {
    title: "Api teste Ozmap",
    version: "1.0.0",
    description:
      "É uma api para cadastro de usuários, como forma de teste para a vaga de desenvolvedor na Ozmap.",
  },
  schemas: require("./schemas.json"),
};

const options = {
  swaggerDefinition,
  apis: ["./src/router/user.router.js"], // altere o caminho para onde estão suas rotas
};

koa.use("/api", SwaggerUI.server, SwaggerUI.setup(swaggerSpec));

require("./src/router/user.router.js");

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
