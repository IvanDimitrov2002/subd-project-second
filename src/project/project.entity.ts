import { mean, round } from 'lodash';
import { User } from 'src/user/user.entity';
import {
    AfterLoad,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Consultation } from './consultation.entity';
import { Grade } from './grade.entity';
import { Task } from './task.entity';

@Entity()
export class Project {
    @AfterLoad()
    calculateGrades = async () => {
        if (!!this.grades) {
            this.avgGrade = parseFloat(
                mean(this.grades.map((grade) => grade.grade)).toFixed(2),
            );
            this.finalGrade = round(this.avgGrade);
        }
    };

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Task, { cascade: true, nullable: true, eager: true })
    @JoinColumn()
    task: Task;

    @OneToMany(() => Consultation, (consultation) => consultation.project, {
        nullable: true,
        cascade: true,
        eager: true,
    })
    consultations: Consultation[];

    @Column({ nullable: true })
    defendDate: Date;

    @OneToMany(() => Grade, (grade) => grade.project, {
        nullable: true,
        cascade: true,
        eager: true,
    })
    grades: Grade[];

    avgGrade: number;

    finalGrade: number;

    @Column({ nullable: true })
    notes: string;

    @ManyToOne(() => User, (user) => user.projects)
    user: User;
}
