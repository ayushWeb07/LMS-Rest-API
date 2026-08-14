import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity('meta_option')
export class MetaOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'options',
    type: 'text',
    nullable: false,
    comment: 'All the meta options to be specified',
  })
  options: string;

  @OneToOne(() => Post, (post) => post.metaOption)
  post: Post;

  @CreateDateColumn({
    name: 'created_at',
    comment: 'Last creation date of the meta options',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: 'Last updation date of the meta options',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    comment: 'Last deletion date of the meta options',
  })
  deletedAt: Date;
}
