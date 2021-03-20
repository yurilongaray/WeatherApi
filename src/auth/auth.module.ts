import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SECRET_JWT } from '../app.config';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.strategy';

@Module({
    controllers: [
        AuthController
    ],
    providers: [
        AuthRepository,
        AuthService,
        LocalStrategy,
        JwtStrategy
    ],
    imports: [
        PassportModule,
        JwtModule.register({
            secret: SECRET_JWT,
            signOptions: { expiresIn: '10h' },
        }),
    ],
})
export class AuthModule { }
