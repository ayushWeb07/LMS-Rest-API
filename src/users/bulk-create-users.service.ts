import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BulkCreateUsersDto } from './dtos/bulk-create-users.dto';
import { User } from './user.entity';

@Injectable()
export class BulkCreateUsersService {
  constructor(private readonly datasource: DataSource) {}

  async bulkCreateUsers(
    bulkCreateUsersDto: BulkCreateUsersDto,
  ): Promise<User[]> {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const createdUsers: User[] = [];

    try {
      // iterate over all the users
      for (const userDto of bulkCreateUsersDto.users) {
        // find the user by email and username
        const existingUser = await queryRunner.manager.findOne(User, {
          where: [
            {
              email: userDto.email,
            },
            {
              username: userDto.username,
            },
          ],
        });

        if (existingUser) {
          if (
            existingUser.email === userDto.email &&
            existingUser.username === userDto.username
          ) {
            throw new BadRequestException(
              `User with such email and username already exists`,
            );
          } else if (existingUser.email === userDto.email) {
            throw new BadRequestException(
              `Email '${userDto.email}' already in use`,
            );
          } else {
            throw new BadRequestException(
              `Username '${userDto.username}' already taken`,
            );
          }
        }

        // create a new user and save it
        let newUser = queryRunner.manager.create(User, userDto);
        newUser = await queryRunner.manager.save(newUser);

        createdUsers.push(newUser);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }

    return createdUsers;
  }
}
