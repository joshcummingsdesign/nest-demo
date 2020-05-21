import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('api/v1/cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  createCat(@Body() createCatDto: CreateCatDto): Cat {
    return this.catsService.create(createCatDto);
  }

  @Get()
  getAllCats(): Cat[] {
    return this.catsService.findAll();
  }

  @Get(':name')
  getCat(@Param('name') name: string): Cat {
    return this.catsService.findByName(name);
  }
}
