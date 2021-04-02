import { Max, Min } from 'class-validator';

export class UpdateGradeDto {
    @Min(2)
    @Max(6)
    grade?: number;

    projectId?: number;
}
