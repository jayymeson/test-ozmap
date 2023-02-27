const Koa = require("koa");
const SwaggerUI = require("swagger-ui");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDocument = require("./schemas.json");

const koa = new Koa();

const swaggerDefinition = {
  info: {
    title: "Api teste Ozmap",
    version: "1.0.0",
    description:
      "É uma api para cadastro de usuários, como forma de teste para a vaga de desenvolvedor na Ozmap.",
  },
  components: require("./schemas.json"),
};

const options = {
  swaggerDefinition,
  apis: ["./src/router/user.router.js"],
};

const swaggerSpec = swaggerJSDoc(options);

koa.use(require("./src/router/user.router.js"));

koa.use("/docs", SwaggerUI.server, SwaggerUI.setup(swaggerSpec));

module.exports = swaggerSpec;

