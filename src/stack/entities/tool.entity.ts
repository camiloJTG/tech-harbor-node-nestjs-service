import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Label } from './label.entity';
import { Language } from './language.entity';

@Entity()
export class Tool {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'text', unique: true })
  logo_url: string;

  @Column({ type: 'text', unique: true, nullable: true })
  page_url: string;

  @ManyToOne(() => Label, (label) => label.tools)
  label: Label;

  @ManyToOne(() => Language)
  language: Language;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
