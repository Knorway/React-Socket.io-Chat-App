import { Request, Response } from 'express';
import { User } from '../entity/User';
import { generateToken } from '../lib';
import bcrypt from 'bcryptjs';
import { Room } from '../entity/Room';

export const registerUser = async (req: Request, res: Response) => {
	const { email, password, name } = req.body;

	const exUser = await User.findOne({ where: { email } });
	if (exUser) {
		res.send(400);
		throw new Error('이미 존재하는 이메일입니다.');
	}

	const hash = await bcrypt.hash(password, 10);
	const user = await User.create({ email, password: hash, name }).save();
	const token = generateToken(user.uuid);

	const openChat = await Room.findOne({ where: { title: 'open chat' } });
	await Room.setUsers(openChat!, [user]);

	res.json(token);
};

export const loginUser = async (req: Request, res: Response) => {
	const user = await User.findOne(
		{ email: req.body.email },
		{ select: ['password', 'uuid'] }
	);

	if (!user) {
		res.status(404);
		throw new Error('존재하지 않는 계정입니다.');
	}

	const passwordsMatch = await bcrypt.compare(req.body.password, user.password);

	if (!passwordsMatch) {
		res.status(403);
		throw new Error('올바르지 않은 비밀번호입니다.');
	}

	const token = generateToken(user.uuid);

	res.json(token);
};

export const validateUser = async (req: Request, res: Response) => {
	res.json(req.user);
};
