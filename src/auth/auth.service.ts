import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService) { }

    public async validateUser(email: string, password: string) {

        const user = await this.authRepository.findByEmail(email);

        if (user && user.password === password) {

            return user
        }

        return null;
    }

    public async login(user: any) {

        const payload = { email: user.email, id: user.id };

        return { token: this.jwtService.sign(payload) };
    }
}
