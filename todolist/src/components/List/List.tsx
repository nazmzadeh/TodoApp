import "./List.scss"
import { IToDos } from '../../interfaces/types';
import { useAppSelector } from '../../store';


export const List =(props:IToDos)=>{
    const {completeTask} =props;
    const todos=useAppSelector((state)=>state.todos)
    return (
            <ul>
                {todos.map((todo)=>(
                    <li key={todo.id}>
                        {todo.task ? <span>{todo.task}</span> : <span>Unknown task name</span>}
                        {todo.deadline ? <span className="deadline">{todo.deadline}</span> : <span>No deadline</span>}
                        <button className="remove" onClick={()=>completeTask(todo.id)}>x</button>
                    </li>
                ))}
            </ul>
    );
}

export default List;