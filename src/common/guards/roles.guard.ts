import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User, UserRole } from 'src/common/interfaces/user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.hasRole(user, roles);
  }

  private hasRole(user: User, roles: UserRole[]): boolean {
    if (!user || !roles) {
      return true;
    }
    const roleNames = roles.map((role) => role.slug);

    const { roles: userRoles } = user;

    return userRoles.some((role) => roleNames.includes(role.slug));
  }
}
