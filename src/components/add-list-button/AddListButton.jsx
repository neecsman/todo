import { useEffect, useState } from "react";

import List from "../list/List";
import Badge from "../badge/Badge";

import './AddListButton.scss'
import axios from "axios";



const AddListButton = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(3);
  const [isLoading , setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (Array.isArray(colors)) {
        setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    setSelectedColor(colors[0].id);
  }

  const addList = () => {
    if (!inputValue) {
      alert('Введите названия списка!');
      return;
    }
    setIsLoading(true);
    axios.post('http://localhost:3001/lists', 
      { 
        name: inputValue, 
        colorId: selectedColor
      })
        .then(({ data }) => {
          const color = colors.filter(c => c.id === selectedColor)[0];
          const listObj = { ...data, color, tasks: []}
          onAdd(listObj);
          onClose();
        })
        .catch(() => {
          alert('Ошибка при добавлении задачи!')
        })
        .finally(() => {
          setIsLoading(false);
        })
      };
  

  return (
  <div className="add-list">
     <List 
      onClick={() => setVisiblePopup(!visiblePopup)}
      items={[
        {
          className: 'todo__list__add-button',
          icon: <ion-icon name="add-circle-outline"></ion-icon>,
          name: "Добавить список"
        }
      ]}/>
     {visiblePopup && <div className="add-list__popup">
          <i 
            onClick={onClose}
            className="add-list__popup-close">
            <ion-icon name="close-outline"></ion-icon>
          </i>

          <input 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)}
            className="field" 
            type="text" 
            placeholder="Название папки"
          />
         
          <div className="add-list__popup-colors">
            {
              colors.map(color => (
                <Badge 
                  onClick={() => setSelectedColor(color.id)} 
                  key={color.id} 
                  color={color.name}
                  className={selectedColor === color.id && 'active' }
                />)
              )}
          </div>
          <button
            onClick={addList}
            className="button">{isLoading ? 'Добавление...' : 'Добавить'}</button>
      </div>}
  </div> 
  )
}

export default AddListButton;