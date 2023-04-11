import { IToDo } from "../TodoList/TodoList";
import "./List.scss"

export interface IToDos{
    todos:IToDo[];
    completeTask(taskNameToDelete:string):void;
}

export const List =(props:IToDos)=>{
    const {todos,completeTask} =props;
    return (
            <ul>
                {todos.map((todo,index)=>(
                    <li key={index}>
                        {todo.task ? <span>{todo.task}</span> : <span>Unknown task name</span>}
                        {todo.deadline ? <span>{todo.deadline}</span> : <span>No deadline</span>}
                        <button onClick={()=>completeTask(todo.task)}>x</button>
                    </li>
                ))}
            </ul>
    );
}

export default List;