import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { DataSource, In } from 'typeorm';
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
    let createdUsers: User[] = [];

    try {
      // store all the emails of the users to be bulk created
      const emailsToBeCreated: string[] = bulkCreateUsersDto.users.map(
        (user) => user.email,
      );
      const usernamesToBeCreated: string[] = bulkCreateUsersDto.users.map(
        (user) => user.username,
      );

      // find the users by email and username
      const existingUsers: User[] = await queryRunner.manager.find(User, {
        where: [
          {
            email: In(emailsToBeCreated),
          },
          {
            username: In(usernamesToBeCreated),
          },
        ],
      });

      if (existingUsers.length > 0) {
        // get the existing emails and usernames
        const existingEmails = existingUsers.map((user) => user.email);
        const existingUsernames = existingUsers.map((user) => user.username);

        for (const userDto of bulkCreateUsersDto.users) {
          if (
            existingEmails.includes(userDto.email) &&
            existingUsernames.includes(userDto.username)
          ) {
            throw new BadRequestException(
              `User with email '${userDto.email}' and username '${userDto.username}' already exists`,
            );
          } else if (existingEmails.includes(userDto.email)) {
            throw new BadRequestException(
              `Email '${userDto.email}' already in use`,
            );
          } else if (existingUsernames.includes(userDto.username)) {
            throw new BadRequestException(
              `Username '${userDto.username}' already taken`,
            );
          } else {
            continue;
          }
        }
      }

      // bulk create the users and save them
      let newUsers: User[] = queryRunner.manager.create(
        User,
        bulkCreateUsersDto.users,
      );
      newUsers = await queryRunner.manager.save(newUsers);

      createdUsers = newUsers;
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
