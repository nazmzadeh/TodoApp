import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import List from '../List/List';
import './TodoList.scss';
import { IToDo, IToDos } from '../../interfaces/types';
import { v4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../store';
import { add,remove, removeAll } from '../../features/todoSlice';

export const TodoList = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<IToDo>();
  const onSubmit: SubmitHandler<IToDo> = data => console.log(data)
  const [task,setTask]= useState("");  
  const [deadline,setDeadline]= useState("");  
  const todos=useAppSelector((state)=>state.todos)
  
  const dispatch=useAppDispatch();
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
    
    const newToDo ={id:v4(),task:task,deadline:deadline};
    dispatch(add(newToDo))
   }

    setTask("");
    setDeadline("");

  }
  const completeTask=(taskId:string)=>{
   dispatch(remove(taskId))
  }
  const completeAll=()=>{
   dispatch(removeAll())
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
            <button type='button' className='remove_all' onClick={completeAll}>Remove All</button>
            <div className='errors'>
            {errors.task && <span>Please enter task</span>}
            {errors.deadline && <span>and deadline..</span>}
            </div>            
          </form>
          <List todos={todos} completeAll={completeAll} completeTask={completeTask}/>
        </div>
      </div>
    </main>
  </div>;
};

export default TodoList;
