import { Request, Response, NextFunction } from 'express';
const router = require('express').Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    status: 'Success',
    message: 'Register route'
  });
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
	const username = req.body.username;
	const password = req.body.password;
  const email = req.body.email;

	console.log({
		username,
    email,
		password
	});
});

module.exports = router;