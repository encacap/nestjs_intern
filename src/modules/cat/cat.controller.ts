import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ForbiddenException } from 'src/common/exceptions/forbidden.exception';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@UseGuards(RolesGuard)
@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  findAll(): Promise<Cat[]> {
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
