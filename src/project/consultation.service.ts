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
import { Consultation } from './consultation.entity';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { ProjectService } from './project.service';

@Injectable()
export class ConsultationService {
    constructor(
        @Inject(forwardRef(() => ProjectService))
        private readonly projectService: ProjectService,

        @InjectRepository(Consultation)
        private consultationRepository: Repository<Consultation>,
    ) {}

    findOneById(id: number): Promise<Consultation> {
        return this.consultationRepository.findOne(id);
    }

    findAll(): Promise<Consultation[]> {
        return this.consultationRepository.find();
    }

    findAllByIds(ids: number[]): Promise<Consultation[]> {
        return this.consultationRepository.findByIds(ids);
    }

    async create(data: CreateConsultationDto): Promise<Consultation> {
        const newConsultation = new Consultation();
        const { projectId, ...rest } = data;
        Object.assign(newConsultation, rest);

        if (projectId) {
            newConsultation.project = await this.projectService.findOneById(
                projectId,
            );
        }

        try {
            return this.consultationRepository.save(newConsultation);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('This grade already exists');
            }
            throw new InternalServerErrorException(error);
        }
    }

    async update(
        id: number,
        data: UpdateConsultationDto,
    ): Promise<Consultation> {
        const consultation = await this.consultationRepository.findOne(id);
        const { projectId, ...rest } = data;

        if (consultation) {
            Object.assign(consultation, rest);

            if (projectId) {
                consultation.project = await this.projectService.findOneById(
                    projectId,
                );
            }

            return this.consultationRepository.save(consultation);
        } else {
            throw new NotFoundException('Consultation Not Found.');
        }
    }
}
