import {
    ConflictException,
    forwardRef,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { ProjectService } from '../project/project.service';

@Injectable()
export class UserService {
    constructor(
        @Inject(forwardRef(() => ProjectService))
        private readonly projectService: ProjectService,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOneById(id: number): Promise<User> {
        return this.userRepository.findOne(id);
    }

    findAllByIds(ids: number[]): Promise<User[]> {
        return this.userRepository.findByIds(ids);
    }

    findAllByFirstName(firstName: string): Promise<User[]> {
        return this.userRepository.find({
            where: { firstName: firstName },
        });
    }

    findAllByMiddleName(middleName: string): Promise<User[]> {
        return this.userRepository.find({
            where: { middleName: middleName },
        });
    }

    findAllByLastName(lastName: string): Promise<User[]> {
        return this.userRepository.find({
            where: { lastName: lastName },
        });
    }

    async findAllByClassifier(classifier: string): Promise<User[]> {
        const users = await this.userRepository.find();
        return users.filter(
            (user) =>
                user.projects.filter(
                    (project) => project.task.classifier === classifier,
                ).length > 0,
        );
    }

    async findAllBySchoolYear(schoolYear: string): Promise<User[]> {
        const years = schoolYear.split('/');
        const users = await this.userRepository.find({
            where: { startYear: years[0], endYear: years[1] },
        });
        return users;
    }

    findAllByGroup(group: number): Promise<User[]> {
        return this.userRepository.find({
            where: { group: group },
        });
    }

    findAllByEducationType(educationType: string): Promise<User[]> {
        return this.userRepository.find({
            where: { educationType: User.getEducationType(educationType) },
        });
    }

    async create(data: CreateUserDto) {
        const newUser = new User();
        const { projectsIds, ...rest } = data;
        rest.educationForm = User.getEducationForm(rest.educationForm);
        rest.educationType = User.getEducationType(rest.educationType);
        Object.assign(newUser, rest);

        if (projectsIds) {
            newUser.projects = await this.projectService.findAllByIds(
                projectsIds,
            );
        }

        try {
            return this.userRepository.save(newUser);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('This user already exists');
            }
            throw new InternalServerErrorException(error);
        }
    }

    async update(id: number, data: UpdateUserDto) {
        const user = await this.userRepository.findOne(id);
        const { projectsIds, ...rest } = data;

        if (user) {
            rest.educationForm = User.getEducationForm(rest.educationForm);
            rest.educationType = User.getEducationType(rest.educationType);
            Object.assign(user, rest);

            if (projectsIds) {
                user.projects = await this.projectService.findAllByIds(
                    projectsIds,
                );
            }

            return this.userRepository.save(user);
        } else {
            throw new NotFoundException('User Not Found.');
        }
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
