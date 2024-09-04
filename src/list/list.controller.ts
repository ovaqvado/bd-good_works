import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Guard } from 'src/guard/guard';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createListDto: CreateListDto, @Req() req) {
    return this.listService.create(createListDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.listService.findAll(+req.user.id);
  }

  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, Guard)
  findOne(@Param('id') id: string) {
    return this.listService.findOne(+id);
  }

  @Patch(':type/:id')
  @UseGuards(JwtAuthGuard, Guard)
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, Guard)
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
