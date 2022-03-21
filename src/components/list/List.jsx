import classNames from 'classnames';
import Badge from '../badge/Badge';




import './List.scss';

const List = ({ items, isRemovable, onClick, onRemove }) => {

    const removeList = (item) => {
        if(window.confirm('Вы действительно хотите удалить список?')) {
            onRemove(item);
        }
    }
    return (
        <ul onClick={onClick} className="todo__list">
            {
                items.map((item, index) => 
                    <li key={index} className={classNames(item.className, {'active': item.active})}>
                        {item.icon ? item.icon : <Badge color={item.color}/>}
                        <span>{item.name}</span>
                        {isRemovable && <i onClick={() => removeList(item)} className='todo__list-remove-icon'><ion-icon size="small" name="trash-outline"></ion-icon></i>}
                    </li>
                )
            }  
      </ul>
    )
}

export default List;

