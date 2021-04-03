import { EducationForm, EducationType } from '../user.entity';

export class UpdateUserDto {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    startYear?: number;
    endYear?: number;
    group?: number;
    certifiedSemester?: number;
    educationForm?: EducationForm;
    educationType?: EducationType;
    projectsIds?: number[];
}
