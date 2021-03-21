import { ForbiddenException } from '@nestjs/common';
import { createUser } from '../create-user';

describe('createUser', () => {

    const repository = {
        findByEmail: jest.fn(),
        save: jest.fn()
    };

    it('should createUser return a saved user', async () => {

        const input = {
            name: 'John Doe',
            email: 'email@email.com',
            password: 'password'
        };

        repository.save.mockResolvedValue(input);

        await expect(createUser(input, repository as any)).resolves.toEqual(input);
    });

    it('should createUser throws ForbiddenException', async () => {

        const input = {
            name: 'John Doe',
            email: 'email@email.com',
            password: 'password'
        };
        const userWithSameEamil = {
            name: 'Jane Doe',
            email: 'email@email.com',
            password: 'password'
        };

        repository.findByEmail.mockResolvedValue(userWithSameEamil);
        repository.save.mockResolvedValue(input);

        await expect(createUser(input, repository as any)).rejects.toThrow(ForbiddenException);
    });
});
