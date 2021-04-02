import {
    ConflictException,
    forwardRef,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { ConsultationService } from './consultation.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GradeService } from './grade.service';
import { Project } from './project.entity';
import { TaskService } from './task.service';

@Injectable()
export class ProjectService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly taskService: TaskService,

        @Inject(forwardRef(() => ConsultationService))
        private readonly consultationService: ConsultationService,

        @Inject(forwardRef(() => GradeService))
        private readonly gradeService: GradeService,

        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
    ) {}

    findOneById(id: number): Promise<Project> {
        return this.projectRepository.findOne(id);
    }

    findAll(): Promise<Project[]> {
        return this.projectRepository.find();
    }

    findAllByIds(ids: number[]): Promise<Project[]> {
        return this.projectRepository.findByIds(ids);
    }

    findAllByClassifier(classifier: string): Promise<Project[]> {
        return this.projectRepository.find({
            where: { task: { classifier: classifier } },
        });
    }

    async create(data: CreateProjectDto): Promise<Project> {
        const newProject = new Project();
        const { taskId, consultationsIds, gradesIds, userId, ...rest } = data;
        Object.assign(newProject, rest);

        if (taskId) {
            newProject.task = await this.taskService.findOneById(taskId);
        }
        if (consultationsIds) {
            newProject.consultations = await this.consultationService.findAllByIds(
                consultationsIds,
            );
        }
        if (gradesIds) {
            newProject.grades = await this.gradeService.findAllByIds(gradesIds);
        }
        if (userId) {
            newProject.user = await this.userService.findOneById(userId);
        }

        try {
            return this.projectRepository.save(newProject);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('This project already exists');
            }
            throw new InternalServerErrorException(error);
        }
    }

    async update(id: number, data: UpdateProjectDto): Promise<Project> {
        const project = await this.projectRepository.findOne(id);
        const { taskId, consultationsIds, gradesIds, userId, ...rest } = data;

        if (project) {
            Object.assign(project, rest);

            if (taskId) {
                project.task = await this.taskService.findOneById(taskId);
            }
            if (consultationsIds) {
                project.consultations = await this.consultationService.findAllByIds(
                    consultationsIds,
                );
            }
            if (gradesIds) {
                project.grades = await this.gradeService.findAllByIds(
                    gradesIds,
                );
            }
            if (userId) {
                project.user = await this.userService.findOneById(userId);
            }

            return this.projectRepository.save(project);
        } else {
            throw new NotFoundException('Project Not Found.');
        }
    }
}
