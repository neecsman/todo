import classNames from 'classnames';
import Badge from '../badge/Badge';




import './List.scss';

const List = ({ items, isRemovable, onClick }) => {
    return (
        <ul onClick={onClick} className="todo__list">
            {
                items.map((item, index) => 
                    <li key={index} className={classNames(item.className, {'active': item.active})}>
                        {item.icon ? item.icon : <Badge color={item.color}/>}
                        <span>{item.name}</span>
                        
                    </li>
                )
            }  
      </ul>
    )
}

export default List;

