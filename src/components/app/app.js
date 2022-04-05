import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import List from '../list/List';
import AddListButton from '../add-list-button/AddListButton'
import Tasks from '../tasks/Tasks';

import './app.scss';

import axios from 'axios';



function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks')
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

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if(item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    }); 
    setLists(newList);
  };

  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList)
  }

  return (
    <div className="todo">
        <div className="todo__sidebar">
          <List items={[
            {
              active: true,
              icon: <ion-icon name="list-outline"></ion-icon>,
              name: "Все задачи"
            },
          ]}/>
          {lists ? (
             <List 
                onClickItem={item => setActiveItem(item)}
                onRemove={id => {
                  const newLists = lists.filter(item => item.id !== id)
                  setLists(newLists);
                }}
                items={lists}
                activeItem={activeItem}
                isRemovable
              />
          ) : (
            'Загрузка...'
          )}         
        <AddListButton  onAdd={onAddList}colors= {colors}/>
        </div>
        <div className="todo__tasks">


        <Routes>
          <Route exact path="/" element={
            (
              lists && lists.map(list => (
                  <Tasks 
                    list={list} 
                    onAddTask={onAddTask} 
                    onEditTitle={onEditListTitle}
                    withoutEmpty/>
                ))
            )
          }/>

          <Route path="/lists/:id" element={
              (lists && activeItem && 
                <Tasks 
                  list={activeItem} 
                  onAddTask={onAddTask} 
                  onEditTitle={onEditListTitle}
                />
              )
            }
          />
        </Routes>

          {/* {lists && activeItem && <Tasks list={activeItem} onAddTask={onAddTask} onEditTitle={onEditListTitle}/>} */}
        </div>
    </div>
  );
}

export default App;

