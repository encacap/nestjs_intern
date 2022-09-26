import { Body, Controller, Get, Post } from '@nestjs/common';
import { ForbiddenException } from 'src/exceptions/forbidden.exception';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  findAll(): Promise<Cat[]> {
    throw new ForbiddenException();
  }

  @Post()
  createOne(@Body() cat: CreateCatDto): Promise<Cat> {
    return this.catService.createOne(cat);
  }
}
