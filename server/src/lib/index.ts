import {
	ErrorRequestHandler,
	NextFunction,
	Request,
	RequestHandler,
	Response,
} from 'express';
import { JWT_SECRET } from '../config/constants';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../entity/User';

export const AsyncHandler =
	(fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
		(fn(req, res, next) as any).catch(next);

export const generateToken = (id: string) => jwt.sign({ id }, JWT_SECRET);

export const jwtAuth = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
		res.status(404);
		next(new Error('no token'));
		return;
	}

	const token = req.headers.authorization.split('Bearer')[1].trim();
	const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
	const user = await User.findOne({ where: { uuid: decoded.id } });

	if (!user) {
		res.status(404);
		next(new Error('authorization failed while decoding given token'));
		return;
	}

	req.user = user;
	next();
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: error.message,
		stack: process.env.NODE_ENV !== 'production' && error.stack,
		handled: true,
	});
};
