import { SetMetadata } from '@nestjs/common';

/**
 * Ключ метаданных, в которые мы будем записывать список разрешённых ролей.
 */
export const ROLES_KEY = 'roles';

/**
 * Декоратор @Roles('admin', 'superadmin', ...)
 * позволяет указать, какие роли имеют доступ к этому маршруту.
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
