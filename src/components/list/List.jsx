import './List.scss';

const List = ({ items, isRemovable }) => {
    return (
        <ul className="todo__list">
            {
                items.map((item, index) => 
                    <li key={index} className={item.active ? "active" : ''}>
                        {item.icon ? item.icon : <i className={`badge badge--${item.color}`}></i>}
                        <span>{item.name}</span>
                    </li>
                )
            }  
      </ul>
    )
}

export default List;