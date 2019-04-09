// var router = require('koa-router')();

// router.prefix('/users');

// router.get('/', function *(next) {
//   this.body = 'this is a users response!';
// });

// router.get('/bar', function *(next) {
//   this.body = 'this is a users/bar response!';
// });

// module.exports = router;

const Router = require('koa-router');
const userController = require('../controller/user')

const router = new Router({
    prefix: '/user'
});

//用户注册
router.post('/regist',userController.create)

//密码登陆
router.post('/login',userController.login)

//获取用户信息
router.post('/getUserInfo',userController.getUserInfo)

module.exports = router;