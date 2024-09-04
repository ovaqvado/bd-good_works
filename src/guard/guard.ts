import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ListService } from 'src/list/list.service';

@Injectable()
export class Guard implements CanActivate {
  constructor(private readonly listService: ListService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id, type } = request.params;

    let entity;

    switch (type) {
      case 'list':
        entity = await this.listService.findOne(id);
        break;

      default:
        throw new NotFoundException('Hello this is error');
    }

    const user = request.user;
    if (entity && user && entity.user.id == user.id) {
      return true;
    }
    return false;
  }
}
