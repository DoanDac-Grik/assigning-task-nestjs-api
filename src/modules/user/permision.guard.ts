import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RequestWithUser } from '../../common/common.interface';
import Permission from './permission.type';

//TODO; refactor to call 1 decorator useguard
const PermissionGuard = (permission: Permission): Type<CanActivate> => {
  class PermissionGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;
      return user?.permissions.includes(permission);
    }
  }
  return mixin(PermissionGuardMixin);
};

export default PermissionGuard;
