import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('user')
export class UserCollection {

	@ObjectIdColumn()
	public id: ObjectID;

	@Column()
	public name: string;

	@Column()
	public email: string;

	@Column()
	public password: string;
}