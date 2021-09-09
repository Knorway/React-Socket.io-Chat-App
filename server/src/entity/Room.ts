import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Message } from './Message';
import { User } from './User';

@Entity()
export class Room extends BaseModel {
	@Column({ nullable: true })
	title!: string;

	@Column({ nullable: true })
	label!: string;

	// -> User
	@ManyToMany((type) => User, (user) => user.rooms, { onDelete: 'CASCADE' })
	@JoinTable()
	users!: User[];

	// -> Message
	@OneToMany((type) => Message, (message) => message.room)
	messages!: Message[];

	static async setUsers(room: Room, users: User[] | number[]) {
		await Room.createQueryBuilder().relation('users').of(room).add(users);
	}
}
