import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ForbiddenException } from 'src/common/exceptions/forbidden.exception';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@UseGuards(RolesGuard)
@UseInterceptors(LoggerInterceptor)
@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService, private readonly configService: ConfigService) {}

  @Get()
  findAll(): Promise<Cat[]> {
    console.log(this.configService.get('database'));
    throw new ForbiddenException();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Cat[]> {
    return this.catService.findOneById(id);
  }

  @Roles('admin', 'user')
  @Post()
  createOne(@Body() cat: CreateCatDto): Promise<Cat> {
    return this.catService.createOne(cat);
  }
}
