import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserCollection } from '../collections/user.collection';

@Injectable()
export class AuthService {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService) { }

    public async validateUser(email: string, password: string) {

        const user = await this.authRepository.findByEmail(email);

        if (user) {

            const isMatch = await compare(password, user.password);

            if (isMatch) {

                return user;
            }
        }

        throw new UnauthorizedException();
    }

    public async login(user: UserCollection) {

        const payload = { name: user.name, email: user.email, id: user.id };

        return { token: this.jwtService.sign(payload) };
    }
}
