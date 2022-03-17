import { useState } from "react";

import List from "../list/List";


import './AddListButton.scss'

const AddListButton = () => {
  const [state, setState] = useState(false);



  return (
  <div className="add-list">
     <List 
     onClick={() => setState(!state)}
     items={[
        {
          className: 'todo__list__add-button',
          icon: <ion-icon name="add-circle-outline"></ion-icon>,
          name: "Добавить список"
        }
      ]}/>
     {state && <div className="add-list__popup">
          <input className="field" type="text" placeholder="Название папки"/>
          <button className="button">Добавить</button>
      </div>}
  </div> 
  )
}

export default AddListButton;