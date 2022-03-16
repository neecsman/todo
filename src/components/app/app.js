import './app.scss';
import List from '../list/List';


function App() {
  return (
    <div className="todo">
        <div className="todo__sidebar">
          <List items={[
            {
              icon: <ion-icon name="list-outline"></ion-icon>,
              name: "Все задачи"
            },
          ]}/>
           <List items={[
            {
              color: "green",
              name: "Покупки",
              active: false
            },
            {
              color: "blue",
              name: "Фронтенд",
              active: true
            },
            {
              color: "pink",
              name: "Фильмы и сериалы",
              active: false
            },
            {
              color: "green",
              name: "Книги",
              active: false
            },
          ]}
          isRemovable
          />
          <List items={[
            {
              icon: <ion-icon name="add-circle-outline"></ion-icon>,
              name: "Добавить список"
            }
          ]}/>
        </div>
        <div className="todo__tusks">

        </div>

    </div>
  );
}

export default App;
