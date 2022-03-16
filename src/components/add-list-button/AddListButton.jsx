import List from "../list/List";


const AddListButton = () => {
  return (
  <>
     <List items={[
        {
          className: 'todo__list__add-button',
          icon: <ion-icon name="add-circle-outline"></ion-icon>,
          name: "Добавить список"
        }
      ]}/>
      <div className="list-add-popup">
          
      </div>  
  </> 
  )
}

export default AddListButton;