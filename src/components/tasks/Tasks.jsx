import './Tasks.scss'

import axios from 'axios';
import NewTask from '../new-task/New-task';


const Tasks = ({ list, onEditTitle }) => {

    const editTitle = () => {
        const newTitle = prompt('Введите название списка', list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle)
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert('Не удалось обновить название списка...')
            });
        }
    }


    return (
        <div className="todo__tasks">
            <div className="tasks">
                <h2 className='tasks__title'>{list.name}</h2>
                <i onClick={editTitle} className='tasks__title-change'><ion-icon name="create-outline"></ion-icon></i>
            </div>

            <div className="tasks__items">
                {!list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {list.tasks.map(task => (
                       <div key={task.id} className="tasks__items-row">
                            <div className="checkbox">
                                <input id={`task-${task.id}`} type="checkbox" />
                                <label htmlFor={`task-${task.id}`}>
                                    <ion-icon size="small" name="checkmark-outline"></ion-icon>
                                </label>    
                            </div>
                            <input readOnly value={task.text}></input>
                       </div>
                    )) 
                }

            <NewTask/>
            </div> 
        </div>
    )
    
}

export default Tasks;