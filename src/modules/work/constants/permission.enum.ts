//TODO: not significant Permissions
export enum WorkPermission {
  CreateWork = 'CreateWork',
  GetAllWork = 'GetAllWork',
  GetWork = 'GetWork',
  UpdateWork = 'UpdateWork',
  DeleteWork = 'DeleteWork',
}

export enum TaskPermission {
  CreateTask = 'CreateTask',
  GetAllTask = 'GetAllTask',
  GetTask = 'GetTask',
  UpdateTask = 'UpdateTask',
  DeleteTask = 'DeleteTask',
  AssignTask = 'AssignTask',
  AssignReviewer = 'AssignReviewer',
  UnAssignTask = 'UnAssignTask',
  UnAssignReviewer = 'UnAssignReviewer',
}
