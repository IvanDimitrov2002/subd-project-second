import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    classifier: string;

    @Column({ nullable: true })
    topic: string;

    @Column({ nullable: true })
    annualProdProgram: number;

    @Column({ nullable: true })
    issueDate: Date;
}
