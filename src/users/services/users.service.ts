import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { FindUserByIdDto } from '../dtos/find-user-by-id.dto';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { FindUserByEmailAndUsernameDto } from '../dtos/find-user-by-email-and-username.dto';
import { UserConflictEnum } from '../enums/user-conflict.enum';
import { BulkCreateUsersDto } from '../dtos/bulk-create-users.dto';
import { BulkCreateUsersService } from './bulk-create-users.service';
import { FindUsersDto } from '../dtos/find-users.dto';
import { FindUserByEmailDto } from '../dtos/find-user-by-email.dto';

/** This is the Users service */
@Injectable()
export class UsersService {
  constructor(
    private readonly bulkCreateUsersService: BulkCreateUsersService,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async bulkCreateUsers(
    bulkCreateUsersDto: BulkCreateUsersDto,
  ): Promise<User[]> {
    const users =
      await this.bulkCreateUsersService.bulkCreateUsers(bulkCreateUsersDto);

    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // find the user by email and username
    const existingUser = await this.usersRepository.findOne({
      where: [
        {
          email: createUserDto.email,
        },
        {
          username: createUserDto.username,
        },
      ],
    });

    if (existingUser) {
      if (
        existingUser.email === createUserDto.email &&
        existingUser.username === createUserDto.username
      ) {
        throw new BadRequestException(
          `User with email '${createUserDto.email}' and username '${createUserDto.username}' already exists`,
        );
      } else if (existingUser.email === createUserDto.email) {
        throw new BadRequestException(
          `Email '${createUserDto.email}' already in use`,
        );
      } else {
        throw new BadRequestException(
          `Username '${createUserDto.username}' already taken`,
        );
      }
    }

    // create a new user and save it
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }

  async findAllUsers(findUsersDto: FindUsersDto): Promise<User[]> {
    // find all the users
    const users = await this.usersRepository.find({
      take: findUsersDto.limit,
      skip: (findUsersDto.page - 1) * findUsersDto.limit,
    });
    return users;
  }

  async findUserById(findUserByIdDto: FindUserByIdDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id: findUserByIdDto.id,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id '${findUserByIdDto.id}' does not exist`,
      );
    }

    return user;
  }

  async findUserByEmail(findUserByEmailDto: FindUserByEmailDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        email: findUserByEmailDto.email,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `User with email '${findUserByEmailDto.email}' does not exist`,
      );
    }

    return user;
  }

  async findUserByEmailAndUsername(
    findUserByEmailAndUsernameDto: FindUserByEmailAndUsernameDto,
  ): Promise<UserConflictEnum> {
    const user = await this.usersRepository.findOne({
      where: {
        email: findUserByEmailAndUsernameDto.email,
        username: findUserByEmailAndUsernameDto.username,
      },
    });

    if (user) {
      if (
        user.email === findUserByEmailAndUsernameDto.email &&
        user.username === findUserByEmailAndUsernameDto.username
      ) {
        return UserConflictEnum.BOTH_TAKEN;
      } else if (user.email === findUserByEmailAndUsernameDto.email) {
        return UserConflictEnum.EMAIL_EXISTS;
      } else {
        return UserConflictEnum.USERNAME_TAKEN;
      }
    }

    return UserConflictEnum.NO_USER;
  }

  async patchUser(patchUserDto: PatchUserDto, userId: number): Promise<void> {
    // find the user by id
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        `We cannot identify you as an authenticated user. Please login again`,
      );
    }

    // check if email got updated
    if (patchUserDto.email) {
      // check if this email already exists
      const existingUser = await this.usersRepository.findOne({
        where: {
          email: patchUserDto.email,
        },
      });

      if (existingUser) {
        throw new BadRequestException(
          `Email '${patchUserDto.email}' already in use`,
        );
      }
    }

    // check if username got updated
    if (patchUserDto.username) {
      // check if this username already exists
      const existingUser = await this.usersRepository.findOne({
        where: {
          username: patchUserDto.username,
        },
      });

      if (existingUser) {
        throw new BadRequestException(
          `Username '${patchUserDto.username}' already taken`,
        );
      }
    }

    // update it
    await this.usersRepository.update(
      {
        id: userId,
      },
      {
        ...patchUserDto,
      },
    );
  }

  async deleteUser(userId: number): Promise<void> {
    // find the user by id
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        `We cannot identify you as an authenticated user. Please login again`,
      );
    }

    // delete the user
    await this.usersRepository.delete({
      id: userId,
    });
  }
}
