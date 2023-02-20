const Router = require('koa-router');
const userController = require('../controller/user.controller.js');

const router = new Router({
  prefix: '/users'
});

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;