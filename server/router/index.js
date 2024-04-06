
const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();

router.post('/registration', userController.regionstration);
router.post('/login', userController.login);
router.post('/logaut', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);

module.exports = router





// const Router = require('express').Router;

// const router = new Router();

// router.post('/registration', (req, res) => {
//     // Обробка запиту реєстрації
// });

// router.post('/login', (req, res) => {
//     // Обробка запиту входу
// });

// router.post('/logout', (req, res) => {
//     // Обробка запиту виходу
// });

// router.get('/activate/:link', (req, res) => {
//     // Обробка запиту активації
// });

// router.get('/refresh', (req, res) => {
//     // Обробка запиту оновлення
// });

// router.get('/users', (req, res) => {
//     // Обробка запиту для отримання списку користувачів
// });

// module.exports = router;
