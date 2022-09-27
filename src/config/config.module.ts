import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import databaseConfig from './database/configuration';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env.local'],
      isGlobal: true,
      load: [databaseConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class ConfigModule {}
