import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import List from '../list/List';
import AddListButton from '../add-list-button/AddListButton'
import Tasks from '../tasks/Tasks';

import './app.scss';

import axios from 'axios';



function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => {
        setLists(data);
    });
    axios.get('http://localhost:3001/colors')
      .then(({ data }) => {
        setColors(data);
    });
  }, []);
  
  const onAddList = (obj) => {
    const newList = [...lists, obj]; 
    setLists(newList);
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

  const onRemoveTask = (listId, taskId) => {
    if( window.confirm('Вы действительно хотите удалить задачу?')) {
      const newList = lists.map(item => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter(task => task.id !== taskId);
        }
        return item;
      });
      setLists(newList);
      axios.delete('http://localhost:3001/tasks/' + taskId)
          .catch(() => {
              alert('Не удалось задачу...')
          });
    }
  }

  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt('Отредактируйте задачу!', taskObj.text);

    if(!newTaskText) {
      return;
    }

    const newLists = lists.map(item => {
      if (item.id === listId) {
        item.tasks = item.tasks.map(task => {
          if(task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newLists);
    axios.patch('http://localhost:3001/tasks/' + taskObj.id, {text: newTaskText})
    .catch(() => {
        alert('Не удалось отредактировать задачу...');
    });
  }

  const onCompleteTask = (listId, taskId, completed) => {
    const newLists = lists.map(item => {
      if (item.id === listId) {
        item.tasks = item.tasks.map(task => {
          if(task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newLists);
    axios.patch('http://localhost:3001/tasks/' + taskId, {completed})
    .catch(() => {
        alert('Не удалось выполнить задачу...');
    });
  }

  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  } 

  useEffect(() => {
    const listId = location.pathname.split('lists/')[1];
    if(lists) {
      const list = lists.find(list => list.id === Number(listId));
      setActiveItem(list);
    }
  }, [lists, location.pathname]);

  return (
    <div className="todo">
        <div className="todo__sidebar">
          <List
          onClickItem={list => navigate(`/`)}
          items={[
          {
            active: location.pathname === '/',
            icon: <ion-icon name="list-outline"></ion-icon>,
            name: "Все задачи"
          },
          ]}/>
          {lists ? (
             <List 
                onClickItem={list => navigate(`lists/${list.id}`)}
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
        <AddListButton  onAdd={onAddList} colors= {colors}/>
        </div>
        <div className="todo__tasks">


        <Routes>
          <Route path="/" element={
            (
              lists && lists.map(list => (
                  <Tasks
                    key={list.id} 
                    list={list} 
                    onAddTask={onAddTask} 
                    onEditTitle={onEditListTitle}
                    onRemoveTask={onRemoveTask}
                    onEditTask={onEditTask}
                    onCompleteTask={onCompleteTask}
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
                  onRemoveTask={onRemoveTask}
                  onEditTask={onEditTask}
                  onCompleteTask={onCompleteTask}
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

