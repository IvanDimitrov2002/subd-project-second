import { EducationForm, EducationType } from '../user.entity';

export class CreateUserDto {
    firstName: string;
    middleName: string;
    lastName: string;
    starYear: number;
    endYear: number;
    group: number;
    certifiedSemester?: number;
    educationForm: EducationForm;
    educationType: EducationType;
    projectsIds?: number[];
}
