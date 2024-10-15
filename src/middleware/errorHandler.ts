import console from 'console';
import { NextFunction, Request, Response } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).send('發生了一些錯誤！');
	next();
};

export default errorHandler;
