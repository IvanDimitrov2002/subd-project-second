import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from './grade.entity';
import { GradeService } from './grade.service';

@Controller('grade')
export class GradeController {
    constructor(private readonly gradeService: GradeService) {}

    @Get()
    findAll(): Promise<Grade[]> {
        return this.gradeService.findAll();
    }

    @Post()
    create(@Body() dto: CreateGradeDto): Promise<Grade> {
        return this.gradeService.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateGradeDto) {
        return this.gradeService.update(id, dto);
    }
}
