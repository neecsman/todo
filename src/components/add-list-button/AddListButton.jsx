import { useEffect, useState } from "react";

import List from "../list/List";
import Badge from "../badge/Badge";

import './AddListButton.scss'



const AddListButton = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(3);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (Array.isArray(colors)) {
        setSelectedColor(colors[0].id)
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
    onAdd(
      {
        id: Math.random(), 
        name: inputValue, 
        color: colors.filter(c => c.id === selectedColor)[0].name
      }
    );
    onClose();
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
            className="button">Добавить</button>
      </div>}
  </div> 
  )
}

export default AddListButton;