import { Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import Joi from 'joi';
import { UserDTO } from './user.dto';

const USER_DTO_VALIDATION = Joi.object({
    name: Joi.string().required().label('name'),
	email: Joi.string().email().required().label('email'),
	password: Joi.string().required().label('password')
});

@Injectable()
export class UserDTOPipe implements PipeTransform {

	public transform(body: UserDTO) {

		const { value, error } = USER_DTO_VALIDATION.validate(body);

		if (error) {

			throw new UnprocessableEntityException(error.details.map(e => e.message).join(';'));
		}

		return value;
	}
}