import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { initDB } from './ormconfig';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [initDB] }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                configService.get('database'),
        }),
        UserModule,
        ProjectModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
