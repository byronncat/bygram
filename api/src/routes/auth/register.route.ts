import express from 'express';
const router = express.Router();
const controller = require('./controller/index');

router.post('/', controller.registerController);

module.exports = router;