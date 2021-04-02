export class CreateProjectDto {
    taskId?: number;
    consultationsIds?: number[];
    defendDate?: Date;
    gradesIds?: number[];
    notes?: string;
    userId: number;
}
