import { useState } from 'react';
import List from '../list/List';
import AddListButton from '../add-list-button/AddListButton'

import DB from '../../assets/db.json'

import './app.scss';


function App() {
  const [lists, setLists] = useState(
    DB.lists.map(item => {
      item.color = DB.colors.filter(color => color.id === item.colorId)[0].name;

      return item;
    })
  );
  
  const onAddList = (obj) => {
    const newList = [...lists, obj]; 
    setLists(newList)
  };


  return (
    <div className="todo">
        <div className="todo__sidebar">
          <List items={[
            {
              icon: <ion-icon name="list-outline"></ion-icon>,
              name: "Все задачи"
            },
          ]}/>
           <List 
            items={lists}
            isRemovable
          />
        <AddListButton 
          onAdd={onAddList}
          colors={DB.colors}/>
        </div>
        <div className="todo__tusks">

        </div>

    </div>
  );
}

export default App;
