import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultation } from './consultation.entity';
import { Grade } from './grade.entity';
import { Project } from './project.entity';
import { Task } from './task.entity';
import { ProjectService } from './project.service';

@Module({
    imports: [TypeOrmModule.forFeature([Project, Task, Grade, Consultation])],
    providers: [ProjectService],
    controllers: [],
    exports: [ProjectService],
})
export class ProjectModule {}
