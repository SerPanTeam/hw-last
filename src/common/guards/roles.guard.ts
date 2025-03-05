import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Получаем список ролей, записанный декоратором @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Если у метода/класса нет декоратора @Roles, значит доступ открыт
    if (!requiredRoles) {
      return true;
    }

    // Получаем request и текущего пользователя
    const request = context.switchToHttp().getRequest();
    const user = request.user; // обычно задаётся AuthGuard-ом (JWT и т.п.)

    // Если пользователя нет или у него нет нужной роли — ошибка
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access denied (insufficient role)');
    }

    return true; // всё хорошо, пропускаем дальше
  }
}
