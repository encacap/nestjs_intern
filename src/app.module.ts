import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './config/database/database.module';
import { CatModule } from './modules/cat/cat.module';

@Module({
  imports: [ConfigModule, DatabaseModule, CatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
