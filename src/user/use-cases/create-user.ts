import { ForbiddenException } from "@nestjs/common";
import { UserDTO } from "../user.dto";
import { UserRepository } from "../user.repository";

export async function createUser(user: UserDTO, repository: UserRepository) {

    const userInDatabase = await repository.findByEmail(user.email);

    if (userInDatabase) {

        throw new ForbiddenException('This email is already being used');
    }

    return repository.save(user);
}