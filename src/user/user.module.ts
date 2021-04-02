import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { ProjectModule } from 'src/project/project.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => ProjectModule),
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
