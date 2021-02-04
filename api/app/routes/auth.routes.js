const router = require('express').Router();
const { login } = new (require('../controllers/users.controller'))();

router.post('/login', login);


module.exports = router;
