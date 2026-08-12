import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

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
    enum: ['post', 'page', 'story'],
    default: 'post',
    comment: 'Type of the post',
  })
  postType: string;

  @Column({
    name: 'post_status',
    type: 'enum',
    enum: ['draft', 'review', 'scheduled'],
    default: 'draft',
    comment: 'Status of the post',
  })
  postStatus: string;

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
