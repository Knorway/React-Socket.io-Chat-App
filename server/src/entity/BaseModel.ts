import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	BeforeInsert,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class BaseModel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'uuid', unique: true })
	uuid!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@BeforeInsert()
	createUuid() {
		this.uuid = uuid();
	}
}
