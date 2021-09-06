import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Message } from './Message';
import { Room } from './Room';

@Entity()
export class User extends BaseModel {
	@Column({ unique: true })
	email!: string;

	@Column({ select: false })
	password!: string;

	@Column()
	name!: string;

	// -> Room
	@ManyToMany((type) => Room, (room) => room.users, { onDelete: 'CASCADE' })
	rooms!: Room[];

	// -> Message
	@OneToMany((type) => Message, (message) => message.user, { cascade: true })
	messages!: Message[];

	static async getAllRoomsOf(userId: number) {
		const user = await this.createQueryBuilder('this')
			.where('this.id = :id', { id: userId })
			.leftJoinAndSelect('this.rooms', 'rooms')
			.leftJoinAndSelect('rooms.users', 'users')
			.leftJoinAndSelect('rooms.messages', 'messages')
			.leftJoinAndSelect('messages.user', 'msgUser')
			.orderBy('rooms.createdAt', 'ASC')
			.addOrderBy('messages.createdAt', 'ASC')
			.getOne();

		return user?.rooms;
	}

	async setRoom(room: Room) {
		await Room.createQueryBuilder().relation('users').of(room).add(this);
	}

	getOpenChat() {
		return this.rooms.find((room) => room.label === 'open chat');
	}
}
