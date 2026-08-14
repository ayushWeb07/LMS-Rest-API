import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { PostTypeEnum } from './enums/post-type.enum';
import { PostStatusEnum } from './enums/post-status.enum';
import { MetaOption } from '../meta-options/meta-option.entity';
import { User } from '../users/user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: 'Title of the post',
  })
  title: string;

  @Column({
    name: 'content',
    type: 'text',
    nullable: false,
    comment: 'Content of the post',
  })
  content: string;

  @Column({
    name: 'slug',
    type: 'varchar',
    length: 10,
    nullable: false,
    unique: true,
    comment: 'Slug of the post',
  })
  slug: string;

  @Column({
    name: 'schema',
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: 'Schema of the post',
  })
  schema: string;

  @Column({
    name: 'thumbnail_url',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Thumbnail url of the post',
  })
  thumbnailUrl: string;

  @Column({
    name: 'tags',
    type: 'simple-array',
    nullable: false,
    comment: 'Tags of the post',
  })
  tags: string[];

  @Column({
    name: 'post_type',
    type: 'enum',
    enum: PostTypeEnum,
    nullable: false,
    default: PostTypeEnum.POST,
    comment: 'Type of the post',
  })
  postType: string;

  @Column({
    name: 'post_status',
    type: 'enum',
    enum: PostStatusEnum,
    nullable: false,
    default: PostStatusEnum.DRAFT,
    comment: 'Status of the post',
  })
  postStatus: string;

  @OneToOne(() => MetaOption, (metaOption) => metaOption.post, {
    cascade: true,
  })
  metaOption: MetaOption;

  @CreateDateColumn({
    name: 'created_at',
    comment: 'Last creation date of the post',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: 'Last updation date of the post',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    comment: 'Last deletion date of the post',
  })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author: User;
}
