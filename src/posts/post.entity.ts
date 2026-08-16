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
  ManyToMany,
  JoinTable,
  Generated,
} from 'typeorm';
import { PostTypeEnum } from './enums/post-type.enum';
import { PostStatusEnum } from './enums/post-status.enum';
import { MetaOption } from '../meta-options/meta-option.entity';
import { User } from '../users/user.entity';
import { Tag } from '../tags/tag.entity';

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
    comment: 'Slug of the post',
  })
  @Generated('uuid')
  slug: string;

  @Column({
    name: 'thumbnail_url',
    type: 'text',
    nullable: false,
    comment: 'Thumbnail url of the post',
  })
  thumbnailUrl: string;

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

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({
    name: 'post_tags',
    joinColumn: {
      name: 'post_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];

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
}
