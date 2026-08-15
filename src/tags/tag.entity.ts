import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 25,
    nullable: false,
    unique: true,
    comment: 'Name of the Tag',
  })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: 'Description of the Tag',
  })
  description: string;

  @Column({
    name: 'slug',
    type: 'varchar',
    length: 10,
    nullable: false,
    unique: true,
    comment: 'Slug of the tag',
  })
  slug: string;

  @CreateDateColumn({
    name: 'created_at',
    comment: 'Last creation date of the tag',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: 'Last updation date of the tag',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    comment: 'Last deletion date of the tag',
  })
  deletedAt: Date;

  @ManyToMany(() => Post, (post) => post.tags, {
    onDelete: 'CASCADE',
  })
  posts: Post[];
}
