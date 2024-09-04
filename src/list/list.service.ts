import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}
  async create(createListDto: CreateListDto, id: number) {
    const isExist = await this.listRepository.findBy({
      user: { id },
      text: createListDto.text,
    });
    if (isExist.length) throw new BadRequestException('List already exist');

    const newList = {
      text: createListDto.text,
      user: {
        id,
      },
    };
    return await this.listRepository.save(newList);
  }

  async findAll(id: number) {
    return await this.listRepository.find({
      where: {
        user: { id },
      },
    });
  }

  async findOne(id: number) {
    const isExist = await this.listRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!isExist) throw new NotFoundException('List not found');
    return isExist;

    return;
  }

  async update(id: number, updateListDto: UpdateListDto) {
    const list = await this.listRepository.findOne({
      where: { id },
    });
    if (!list) throw new NotFoundException('list not found');
    return await this.listRepository.update(id, updateListDto);
  }

  async remove(id: number) {
    const list = await this.listRepository.findOne({
      where: { id },
    });
    if (!list) throw new NotFoundException('list not found');

    return await this.listRepository.delete(id);
  }
}
