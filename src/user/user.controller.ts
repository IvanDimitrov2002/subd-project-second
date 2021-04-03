import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { intersectionBy } from 'lodash';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAllByCriteria(@Query() query: UserQueryDto): Promise<User[]> {
        let users = await this.userService.findAll();

        if (Object.keys(query).length > 0) {
            if (query.id) {
                users = intersectionBy(
                    users,
                    [await this.userService.findOneById(query.id)],
                    'id',
                );
            }
            if (query.firstName) {
                users = intersectionBy(
                    users,
                    await this.userService.findAllByFirstName(query.firstName),
                    'id',
                );
            }
            if (query.middleName) {
                users = intersectionBy(
                    users,
                    await this.userService.findAllByMiddleName(
                        query.middleName,
                    ),
                    'id',
                );
            }
            if (query.lastName) {
                users = intersectionBy(
                    users,
                    await this.userService.findAllByLastName(query.lastName),
                    'id',
                );
            }
            if (query.schoolYear) {
                users = intersectionBy(
                    users,
                    await this.userService.findAllBySchoolYear(
                        query.schoolYear,
                    ),
                    'id',
                );
            }
            if (query.group) {
                users = intersectionBy(
                    users,
                    await this.userService.findAllByGroup(query.group),
                    'id',
                );
            }
            if (query.educationType) {
                users = intersectionBy(
                    users,
                    await this.userService.findAllByEducationType(
                        query.educationType,
                    ),
                    'id',
                );
            }
            if (query.classifier) {
                users = intersectionBy(
                    users,
                    await this.userService.findAllByClassifier(
                        query.classifier,
                    ),
                    'id',
                );
            }
        }
        return users;
    }

    @Post()
    create(@Body() dto: CreateUserDto): Promise<User> {
        return this.userService.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        return this.userService.update(id, dto);
    }
}
