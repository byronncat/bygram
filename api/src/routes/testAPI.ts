import { Request, Response, NextFunction } from 'express';
import express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.json({
		info: 'Node.js, Express, and Postgres API',
		message: 'Hello World!',
		data1: 'data1',
		data2: 'data2',
		data3: 'data3',
		data4: 'data4',
		data5: 'data5',
		data6: 'data6',
	});
});

module.exports = router;