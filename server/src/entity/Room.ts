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
	@OneToMany((type) => Message, (message) => message.room, { cascade: true })
	messages!: Message[];

	static async setUsers(room: Room, users: User[] | number[]) {
		await Room.createQueryBuilder().relation('users').of(room).add(users);
	}
}

// static async getRooms(userId?: number) {
// 	const pending = (await RoomUser.getAllRoomsOf(
// 		userId!,
// 		true
// 	)) as SelectQueryBuilder<RoomUser>;

// 	const query = pending
// 		.leftJoinAndSelect('', 'this')

// 	console.log(await pending.getMany());
// 	console.log('==================================');
// 	console.log(await RoomUser.getAllRoomsOf(userId!));

// 	// const query = await this.createQueryBuilder('this')
// 	// .leftJoinAndSelect('this.users', 'roomUsers')
// 	// .having('roomUsers.userId = :id', { id: userId })
// 	// .leftJoinAndSelect('roomUsers.user', 'user')
// 	// .having(userId ? 'roomUsers.userId = :id' : '', { id: userId })
// 	// .getMany();

// 	// console.log(query);
// 	// console.log('==========================');
// 	// query.forEach((e) => console.log(e.users));

// 	// return query.map((room) => ({
// 	// 	...room,
// 	// 	users: room.users.map(({ user }) => user),
// 	// 	.filter((user) => user.id === userId),
// 	// }));
