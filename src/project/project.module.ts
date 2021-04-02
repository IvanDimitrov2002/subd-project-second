import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { ConsultationController } from './consultation.controller';
import { Consultation } from './consultation.entity';
import { ConsultationService } from './consultation.service';
import { GradeController } from './grade.controller';
import { Grade } from './grade.entity';
import { GradeService } from './grade.service';
import { ProjectController } from './project.controller';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project, Task, Grade, Consultation]),
        forwardRef(() => UserModule),
    ],
    providers: [ProjectService, TaskService, GradeService, ConsultationService],
    controllers: [
        ProjectController,
        TaskController,
        GradeController,
        ConsultationController,
    ],
    exports: [ProjectService],
})
export class ProjectModule {}
