import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOneById(id: string): Promise<User> {
        return this.userRepository.findOne(id);
    }

    findAllByFirstName(firstName: string): Promise<User[]> {
        return this.userRepository.find({
            where: { firstName: firstName },
        });
    }

    findAllByMiddleName(middleName: string): Promise<User[]> {
        return this.userRepository.find({
            where: { middleName: middleName },
        });
    }

    findAllByLastName(lastName: string): Promise<User[]> {
        return this.userRepository.find({
            where: { lastName: lastName },
        });
    }

    async findAllBySchoolYear(schoolYear: string): Promise<User[]> {
        const years = schoolYear.split('/');
        const users = await this.userRepository.find({
            where: { startYear: years[0], endYear: years[1] },
        });
        return users;
    }

    findAllByGroup(group: number): Promise<User[]> {
        return this.userRepository.find({
            where: { group: group },
        });
    }

    findAllByEducationType(educationType: string): Promise<User[]> {
        return this.userRepository.find({
            where: { educationType: User.getEducationType(educationType) },
        });
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
