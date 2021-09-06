import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/constants';
import { User } from '../../entity/User';

export const jwtAuth = async (socket: SocketIO.Socket, next: (err?: any) => void) => {
	try {
		const token = socket.handshake.query?.token;
		const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
		const user = await User.createQueryBuilder('this')
			.leftJoinAndSelect('this.rooms', 'rooms')
			.where('this.uuid = :id', { id: decoded.id })
			.andWhere('rooms.label = :label', { label: 'open chat' })
			.getOne();

		if (!user) {
			throw new Error('socket auth error');
		}

		socket.user = user;
		next();
	} catch (error) {
		console.log(error.message, 'socket.io auth middleware error');
		next(error);
	}
};
