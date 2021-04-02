import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Get()
    findAll(): Promise<Project[]> {
        return this.projectService.findAll();
    }

    @Post()
    create(@Body() dto: CreateProjectDto): Promise<Project> {
        return this.projectService.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateProjectDto) {
        return this.projectService.update(id, dto);
    }
}
