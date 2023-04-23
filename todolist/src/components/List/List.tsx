import { IToDo } from "../TodoList/TodoList";
import "./List.scss"

export interface IToDos{
    todos:IToDo[];
    completeTask(taskId:number):void;
}

export const List =(props:IToDos)=>{
    const {todos,completeTask} =props;
    return (
            <ul>
                {todos.map((todo)=>(
                    <li key={todo.id}>
                        {todo.task ? <span>{todo.task}</span> : <span>Unknown task name</span>}
                        {todo.deadline ? <span>{todo.deadline}</span> : <span>No deadline</span>}
                        <button onClick={()=>completeTask(todo.id)}>x</button>
                    </li>
                ))}
            </ul>
    );
}

export default List;