import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Consultation {
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    holdDate: Date;

    @ManyToOne(() => Project, (project) => project.consultations)
    project: Project;
}
