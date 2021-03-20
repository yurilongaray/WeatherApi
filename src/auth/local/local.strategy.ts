import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthRepository } from '../auth.repository';
import { ObjectID } from 'typeorm';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private authRepository: AuthRepository) {

        super({
            usernameField: 'email',
            passwordField: 'password'
        })
    }

    public async validate(email: string, password: string): Promise<{ id: ObjectID, email: string } | never> {

        const user = await this.authRepository.findByEmail(email);

        if (!user || user.password !== password) {

            throw new UnauthorizedException();
        }

        return { id: user.id, email: user.email };
    }
}
