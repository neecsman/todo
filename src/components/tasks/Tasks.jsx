import './Tasks.scss'

import axios from 'axios';
import NewTask from '../new-task/New-task';


const Tasks = ({ list, onEditTitle, onAddTask, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask}) => {
    const editTitle = () => {
        const newTitle = prompt('Введите название списка', list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle)
            axios.patch('http://localhost:3001/lists/' + list.id, {name: newTitle})
                .catch(() => {
                    alert('Не удалось обновить название списка...')
                });
        }
    }

    const onChangeCheckbox = (taskId, target) => {
        onCompleteTask(list.id, taskId, target)
    }


    return (
        <>
            <div className="tasks">
                <h2 style={{ color: list.color.hex}} className='tasks__title'>{list.name}</h2>
                <i onClick={editTitle} className='tasks__title-change'><ion-icon name="create-outline"></ion-icon></i>
            </div>

            <div className="tasks__items">
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {list.tasks && list.tasks.map(task => (
                       <div key={task.id} className="tasks__items-row">
                            <div className="checkbox">
                                <input onChange={(e) => onChangeCheckbox(task.id, e.target.checked)} id={`task-${task.id}`} type="checkbox" checked={task.completed}/>
                                <label htmlFor={`task-${task.id}`}>
                                    <ion-icon size="small" name="checkmark-outline"></ion-icon>
                                </label>    
                            </div>
                            <p>{task.text}</p>
                            <div className='tasks__items-row-actions'>
                               <div onClick={() => onEditTask(list.id, {"id": task.id, "text": task.text})}><ion-icon size="small" name="pencil-outline"></ion-icon></div>
                                <div onClick={() => onRemoveTask(list.id, task.id)}><ion-icon name="close-outline"></ion-icon></div>
                            </div>
                       </div>
                    )) 
                }
                <NewTask key={list.id} list={list} onAddTask={onAddTask} />
            </div> 
        </>
    );   
}

export default Tasks;