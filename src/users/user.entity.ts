import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'username',
    type: 'varchar',
    length: 25,
    nullable: false,
    unique: true,
    comment: 'Username of the user',
  })
  username: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 25,
    nullable: false,
    unique: true,
    comment: 'Email of the user',
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 60,
    nullable: true,
    comment: 'Password of the user',
  })
  password?: string;

  @Column({
    name: 'google_id',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Google id of the user',
  })
  googleId?: string;

  @Column({
    name: 'is_verified',
    type: 'boolean',
    default: false,
    comment: 'Is the user verified?',
  })
  isVerified: boolean;

  @CreateDateColumn({
    name: 'created_at',
    comment: 'When was the user created?',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: 'When was the user last updated?',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    comment: 'When was the user deleted?',
  })
  deletedAt: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
