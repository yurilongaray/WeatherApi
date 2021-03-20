import { Body, Controller, Post } from '@nestjs/common';
import { UserCollection } from '../collections/user.collection';
import { UserRepository } from './user.repository';

@Controller('user')
export class UserController {

    constructor(private readonly userRepositoryService: UserRepository) { }

    @Post('/register')
    public register(@Body() payload: any) {

        const user = new UserCollection();

        user.name = payload.name;
        user.email = payload.email;
        user.password = payload.password;

        return this.userRepositoryService.save(user);
    }
}
