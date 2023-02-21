import {
  TaskPermission,
  WorkPermission,
} from '../work/constants/permission.enum';

const Permission = {
  ...WorkPermission,
  ...TaskPermission,
};

type Permission = WorkPermission | TaskPermission;

export default Permission;
