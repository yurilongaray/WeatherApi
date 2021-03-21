import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ObjectID } from 'typeorm';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {

        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }

    public async validate(email: string, password: string): Promise<{ id: ObjectID, email: string } | never> {

        return this.authService.validateUser(email, password);
    }
}