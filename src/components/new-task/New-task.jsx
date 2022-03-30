import { useState } from 'react';
import axios from 'axios';

import './New-task.scss'

const NewTask = ({ list, onAddTask }) => {
    
    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
    };

    const addTask = () => {
        const obj = {
            "listId": list.id,
            "text": inputValue,
            "completed": false
        };
        setIsLoading(true);
        axios.post('http://localhost:3001/tasks', obj)
            .then(({data}) => {
                console.log(data);
                onAddTask(list.id, obj);
                toggleFormVisible();
            })
            .catch(() => {
                alert('Ошибка при добавлении списка!')
            })
            .finally(() => {
                setIsLoading(false);
            });
        
    }
 
    

    return (
        <div className="tasks__form">

            {!visibleForm  ? ( 
                <div onClick={toggleFormVisible} className="tasks__form-new">
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <span>Новая задача</span>
                </div> 
                ) : (
                <div  className="tasks__form-block">
                    <input 
                        value={inputValue} 
                        className="field" 
                        type="text" 
                        placeholder="Текст задачи"
                        onChange={e => setInputValue(e.target.value)}/>
                    <button disabled={isLoading} onClick={addTask} className="button">
                        {isLoading ? 'Добавление...' : 'Добавить задачу'}
                    </button>
                    <button onClick={toggleFormVisible} className="button button__gray">Отмена</button>
                </div>
                )}
        </div>
    );
}

export default NewTask;