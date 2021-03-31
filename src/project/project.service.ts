import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
    ) {}

    findAllByClassifier(classifier: string): Promise<Project[]> {
        return this.projectRepository.find({
            where: { task: { classifier: classifier } },
        });
    }
}
