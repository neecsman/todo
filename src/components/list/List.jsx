import classNames from 'classnames';
import Badge from '../badge/Badge';
import axios from 'axios';



import './List.scss';

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {

    const removeList = (item) => {
        if(window.confirm('Вы действительно хотите удалить список?')) {
            axios.delete('http://localhost:3001/lists/' + item.id)
                .then(() => {onRemove(item.id)}); 
        }
    }


    return (
        <ul onClick={onClick} className="todo__list">
            {
                items.map((item, index) => 
                    <li 
                        onClick={onClickItem ? () => onClickItem(item) : null}
                        key={index} 
                        className={classNames(item.className, {'active': item.active ? item.active : activeItem && activeItem.id === item.id})}
                    >
                        {item.icon ? item.icon : <Badge color={item.color.name}/>}
                        <span>{item.name}{item.tasks && ` (${item.tasks.length})`} </span>
                        {isRemovable && 
                            <i 
                                onClick={() => removeList(item)} className='todo__list-remove-icon'>
                                <ion-icon size="small" name="trash-outline"></ion-icon>
                            </i>
                        }
                    </li>
                )
            }  
      </ul>
    )
}

export default List;

