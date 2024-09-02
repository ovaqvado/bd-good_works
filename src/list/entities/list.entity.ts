import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class List {
  @PrimaryGeneratedColumn({ name: 'list_id' })
  id: number;

  @Column()
  text: string;

  @OneToOne(() => User, (user) => user.lists)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
