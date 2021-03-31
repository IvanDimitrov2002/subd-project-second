import { Max, Min } from 'class-validator';
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
export class Grade {
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    @Min(2)
    @Max(6)
    grade: number;

    @ManyToOne(() => Project, (project) => project.grades)
    project: Project;
}
