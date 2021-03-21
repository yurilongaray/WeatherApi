import { genSaltSync, hashSync } from 'bcrypt';
import { BeforeInsert, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('user')
export class UserCollection {

	@ObjectIdColumn()
	public id: ObjectID;

	@Column()
	public name: string;

	@Column()
	public email: string;

	@Column({ name: 'password' })
	public password: string;

	@BeforeInsert()
	async hashPassword() {

		this.password = await hashSync(this.password, genSaltSync(10));;
	}
}