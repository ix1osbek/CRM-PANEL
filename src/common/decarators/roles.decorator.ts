import { SetMetadata } from '@nestjs/common';

export const AssignRoles = (...accessRoles: string[]) =>
    SetMetadata('roles', accessRoles);
