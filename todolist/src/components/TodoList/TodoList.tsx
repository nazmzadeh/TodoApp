import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import List from '../List/List';
import './TodoList.scss';

export interface IToDo {
  id:number;
  task: string;
  deadline: string;
}
export const TodoList = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<IToDo>();
  const onSubmit: SubmitHandler<IToDo> = data => console.log(data);
  const [task,setTask]= useState("");  
  const [deadline,setDeadline]= useState("");  
  const [id,setId]= useState(0);  
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
    
    const newToDo ={id:id,task:task,deadline:deadline};
    setId(id => id + 1);
    setTodoList([...todoList, newToDo])
   }

    setTask("");
    setDeadline("");

  }
  const completeTask=(taskId:number)=>{
    setId(0);
    setTodoList(
    todoList.filter((todo)=>{
      return todo.id!==taskId;
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
                <input {...register("deadline",{required:true})} placeholder="Add Deadline (in days)..." onChange={handleChange} name="deadline" className='deadline' value={deadline} />
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
