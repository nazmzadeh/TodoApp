
export interface IToDos{
    todos:IToDo[];
    completeTask(taskId:string):void;
    completeAll(todos:IToDo[]):void;
}

export interface IToDo {
    id:string;
    task: string;
    deadline: string;
  }