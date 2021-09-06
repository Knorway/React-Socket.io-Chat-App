import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Room } from './Room';
import { User } from './User';

@Entity()
export class Message extends BaseModel {
	@Column()
	message!: string;

	// -> User
	@ManyToOne((type) => User, (user) => user.messages)
	user!: User;

	// -> Room
	@ManyToOne((type) => Room, (room) => room.messages)
	room!: Room;

	async setRoom(room: Room) {
		await Room.createQueryBuilder().relation('messages').of(room).add(this);
	}
}
