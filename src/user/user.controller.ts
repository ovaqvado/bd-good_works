import {
  Controller,
  Get,
  Post,
  Body,
  // Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Get()
  // async findOne(@Query('id', ParseIntPipe) id: number) {
  //   return this.userService.findOne(id);
  // }
}
