import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { ConsultationService } from './consultation.service';
import { Consultation } from './consultation.entity';

@Controller('consultations')
export class ConsultationController {
    constructor(private readonly consultationService: ConsultationService) {}

    @Get()
    findAll(): Promise<Consultation[]> {
        return this.consultationService.findAll();
    }

    @Post()
    create(@Body() dto: CreateConsultationDto): Promise<Consultation> {
        return this.consultationService.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateConsultationDto) {
        return this.consultationService.update(id, dto);
    }
}
