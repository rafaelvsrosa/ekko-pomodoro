import type { TaskModel } from "../../models/TaskModel";

export enum TaskActionsTypes {
  START_TASK = "START_TASK",
  INTERRUPT_TASK = "INTERRUPT_TASK",
  RESET_STATE = "RESET_STATE",
}

export type TaskActionWithPayload =
  | {
      type: TaskActionsTypes.START_TASK;
      payload: TaskModel;
    }
  | {
      type: TaskActionsTypes.INTERRUPT_TASK;
      payload: TaskModel;
    }
  | {
      type: TaskActionsTypes.RESET_STATE;
    };

export type TaskActionsWithoutPayload = {
  type: TaskActionsTypes.RESET_STATE;
};

export type TaskActionModel = 
| TaskActionWithPayload 
| TaskActionsWithoutPayload;
