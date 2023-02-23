const Router = require("koa-router");
const userController = require("../controller/user.controller.js");

const router = new Router({
  prefix: "/users",
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID do usuário a ser retornado
 *         in: path
 *         required: true
 *         type: integer
 *         minimum: 1
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 *
 */
router.get("/:id", userController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: Objeto do usuário a ser criado
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             img:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Parâmetros inválidos
 */
router.post("/", userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID do usuário a ser atualizado
 *         in: path
 *         required: true
 *         type: integer
 *         minimum: 1
 *       - name: user
 *         description: Objeto do usuário a ser atualizado
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             img:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       400:
 *         description: Parâmetros inválidos
 */
router.put("/:id", userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Exclui um usuário existente
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID do usuário a ser excluído
 *         in: path
 *         required: true
 *         type: integer
 *         minimum: 1
 *     responses:
 *       204:
 *         description: Usuário excluído com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/:id", userController.deleteUser);

module.exports = router;
