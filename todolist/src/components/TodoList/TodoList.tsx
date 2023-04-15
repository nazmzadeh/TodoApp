import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import List from '../List/List';
import './TodoList.scss';

export interface IToDo {
  task: string;
  deadline: string;
}
export const TodoList = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<IToDo>();
  const onSubmit: SubmitHandler<IToDo> = data => console.log(data);
  const [task,setTask]= useState<string>("");  
  const [deadline,setDeadline]= useState<string>("");  
  const [todoList,setTodoList]= useState<IToDo[]>([]);  
  
  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
    if (e.target.name==="task") {
      setTask(e.target.value);
      
    }else{
      const deadlineValue=e.target.value.replace(/\D/g,"");
      setDeadline(deadlineValue);
    }
  }
  const addTask=()=>{
   if (task.trim()!=="" && deadline.trim()!=="") {
    
    const newToDo ={task:task,deadline:deadline};
    setTodoList([...todoList, newToDo])
   }

    setTask("");
    setDeadline("");

  }
  const completeTask=(taskNameToDelete:string)=>{
   setTodoList(
    todoList.filter((todo)=>{
      return todo.task!==taskNameToDelete;
    })
   )
  }
  return <div className="todolist">
    <header>
      <h1>Todo List</h1>
    </header>
    <main>
      <div className="wrapper">
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input">
                <input {...register("task",{required:true})} placeholder="Add Task..." onChange={handleChange} name="task" value={task}/>
                <input {...register("deadline",{required:true})} placeholder="Add Deadline (in days)..." onChange={handleChange} name="deadline" value={deadline} />
            </div>
            <button onClick={addTask}>Add</button>
            <div className='errors'>
            {errors.task && <span>Please enter task</span>}
            {errors.deadline && <span>and deadline..</span>}
            </div>            
          </form>
          <List todos={todoList} completeTask={completeTask}/>
        </div>
      </div>
    </main>
  </div>;
};

export default TodoList;
