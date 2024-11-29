import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('date')
  dueDate: string;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Done', 'In Progress', 'Paused'],
    default: 'Pending',
  })
  status: 'Pending' | 'Done' | 'In Progress' | 'Paused';

  @Column({
    type: 'enum',
    enum: ['Low', 'Medium', 'High'],
    default: 'High',
  })
  priority: 'Low' | 'Medium' | 'High';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
