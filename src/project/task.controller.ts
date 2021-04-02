import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    findAll(): Promise<Task[]> {
        return this.taskService.findAll();
    }

    @Post()
    create(@Body() dto: CreateTaskDto): Promise<Task> {
        return this.taskService.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: CreateTaskDto) {
        return this.taskService.update(id, dto);
    }
}
