import axios from 'axios';

import { useState, useEffect } from 'react';
import List from '../list/List';
import AddListButton from '../add-list-button/AddListButton'
import Tasks from '../tasks/Tasks';

import './app.scss';


function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  


  // const [lists, setLists] = useState(
  //   DB.lists.map(item => {
  //     item.color = DB.colors.filter(color => color.id === item.colorId)[0].name;

  //     return item;
  //   })
  // );

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color')
      .then(({ data }) => {
        setLists(data)
    });
    axios.get('http://localhost:3001/colors')
      .then(({ data }) => {
        setColors(data)
    });
  }, []);
  
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
          {lists ? (
             <List 
                onRemove={id => {
                  const newLists = lists.filter(item => item.id !== id)
                  setLists(newLists);
                }}
                items={lists}
                isRemovable
              />
          ) : (
            'Загрузка...'
          )}
          
        <AddListButton 
          onAdd={onAddList}
          colors={colors}/>
        </div>
        <Tasks/>
    </div>
  );
}

export default App;
