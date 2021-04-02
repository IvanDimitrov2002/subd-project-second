import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    findOneById(id: number): Promise<Task> {
        return this.taskRepository.findOne(id);
    }

    findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    create(data: CreateTaskDto): Promise<Task> {
        const newTask = new Task();
        Object.assign(newTask, data);

        try {
            return this.taskRepository.save(newTask);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('This task already exists');
            }
            throw new InternalServerErrorException(error);
        }
    }

    async update(id: number, data: CreateTaskDto): Promise<Task> {
        const task = await this.taskRepository.findOne(id);

        if (task) {
            Object.assign(task, data);

            return this.taskRepository.save(task);
        } else {
            throw new NotFoundException('User Not Found.');
        }
    }
}
