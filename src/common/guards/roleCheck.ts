import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RoleCheck implements CanActivate {
  constructor(private readonly metaReader: Reflector) { }

  canActivate(ctx: ExecutionContext): boolean {
    const allowedRoles = this.metaReader.getAllAndOverride<string[]>('roles', [
      ctx.getHandler(),
      ctx.getClass(),
    ])

    if (!allowedRoles) return true

    const req = ctx.switchToHttp().getRequest()
    const currentUser = req.user

    return allowedRoles.includes(currentUser.role)
  }
}

