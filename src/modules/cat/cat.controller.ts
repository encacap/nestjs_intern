import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';

@UseGuards(RolesGuard)
@UseInterceptors(LoggerInterceptor)
@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  findAll(): Promise<Cat[]> {
    return this.catService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Cat> {
    return this.catService.findOneById(id);
  }

  @Roles('admin', 'user')
  @Post()
  async createOne(@Body() cat: CreateCatDto): Promise<Cat> {
    return this.catService.createOne(cat);
  }
}
