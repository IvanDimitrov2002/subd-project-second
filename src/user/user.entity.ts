import { Project } from 'src/project/project.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export type EducationForm = 'EXTRAMURAL' | 'REGULAR';
export type EducationType = 'BACHELOR' | 'MASTER' | 'DOCTORATE';

@Entity()
export class User {
    static getEducationType(educationType: string): EducationType {
        const educationTypeLower = educationType.toLowerCase();
        switch (educationTypeLower) {
            case 'bachelor':
            case 'бакалавър':
                return 'BACHELOR';
            case 'master':
            case 'магистър':
                return 'MASTER';
            case 'doctorate':
            case 'доктор':
                return 'DOCTORATE';
            default:
                undefined;
        }
    }

    static getEducationForm(educationForm: string): EducationForm {
        const educationTypeLower = educationForm.toLowerCase();
        switch (educationTypeLower) {
            case 'extramural':
            case 'задочно':
                return 'EXTRAMURAL';
            case 'regular':
            case 'редовно':
                return 'REGULAR';
            default:
                undefined;
        }
    }

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    middleName: string;

    @Column()
    lastName: string;

    @Column()
    startYear: number;

    @Column()
    endYear: number;

    @Column()
    group: number;

    @Column({ nullable: true })
    certifiedSemester: number;

    @Column({ default: 'REGULAR' })
    educationForm: EducationForm;

    @Column()
    educationType: EducationType;

    @OneToMany(() => Project, (project) => project.user, {
        nullable: true,
        cascade: true,
        eager: true,
    })
    projects: Project[];
}
