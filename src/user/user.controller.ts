import { Body, Controller, Post } from '@nestjs/common';
import { createUser } from './use-cases/create-user';
import { UserDTO } from './user.dto';
import { UserDTOPipe } from './user.pipe';
import { UserRepository } from './user.repository';

@Controller('user')
export class UserController {

    constructor(private readonly userRepositoryService: UserRepository) { }

    @Post('/register')
    public register(@Body(UserDTOPipe) user: UserDTO) {

        return createUser(user, this.userRepositoryService);
    }
}
