import './Tasks.scss'

const Tasks = () => {
    return (
        <div className="todo__tasks">
            <div className="tasks">
                <h2 className='tasks__title'>Фронтенд</h2>
                <i className='tasks__title-change'><ion-icon name="create-outline"></ion-icon></i>
            </div>

            <div className="tasks__items">
                <div className="checkbox">
                    <input id="check" type="checkbox" />
                    <label htmlFor="check">
                        <ion-icon size="small" name="checkmark-outline"></ion-icon>
                    </label>
                    
                </div>
                <input value='Какое-то рандомное задание'></input>
            </div>
        
        </div>
    )
    
}

export default Tasks;