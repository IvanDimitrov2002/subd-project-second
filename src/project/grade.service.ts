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
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from './grade.entity';
import { ProjectService } from './project.service';

@Injectable()
export class GradeService {
    constructor(
        @Inject(forwardRef(() => ProjectService))
        private readonly projectService: ProjectService,

        @InjectRepository(Grade)
        private gradeRepository: Repository<Grade>,
    ) {}

    findOneById(id: number): Promise<Grade> {
        return this.gradeRepository.findOne(id);
    }

    findAll(): Promise<Grade[]> {
        return this.gradeRepository.find();
    }

    findAllByIds(ids: number[]): Promise<Grade[]> {
        return this.gradeRepository.findByIds(ids);
    }

    async create(data: CreateGradeDto): Promise<Grade> {
        const newGrade = new Grade();
        const { projectId, ...rest } = data;
        Object.assign(newGrade, rest);

        if (projectId) {
            newGrade.project = await this.projectService.findOneById(projectId);
        }

        try {
            return this.gradeRepository.save(newGrade);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('This grade already exists');
            }
            throw new InternalServerErrorException(error);
        }
    }

    async update(id: number, data: UpdateGradeDto): Promise<Grade> {
        const grade = await this.gradeRepository.findOne(id);
        const { projectId, ...rest } = data;

        if (grade) {
            Object.assign(grade, rest);

            if (projectId) {
                grade.project = await this.projectService.findOneById(
                    projectId,
                );
            }

            return this.gradeRepository.save(grade);
        } else {
            throw new NotFoundException('Grade Not Found.');
        }
    }
}
