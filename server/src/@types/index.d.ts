import { User as UserModel } from '../entity/User';

declare global {
	namespace Express {
		interface Request {
			user: UserModel;
		}
	}
	namespace SocketIO {
		interface Socket {
			user: UserModel;
		}
	}
}
