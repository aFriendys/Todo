import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import './styles.css';

function App() {
  const createTodoItem = (label, creationTime, completed, editing, startingTime) => ({
    label,
    creationTime,
    completed,
    editing,
    startingTime,
  });

  const [todoItems, setTodoItems] = useState([
    createTodoItem('Task 1', '1661357995014', true, false, 5 * 60),
    createTodoItem('Task 2', '1661357995614', true, false, 20 * 60),
    createTodoItem('Task 3', '1661358014766', false, false, 30 * 60),
  ]);

  const [filter, setFilter] = useState('all');

  const changeTodoLabel = (id, value) => {
    setTodoItems((items) =>
      items.map((elem) => {
        const newElem = elem;
        if (newElem.creationTime === id) {
          newElem.editing = false;
          newElem.label = value;
        }
        return newElem;
      })
    );
  };
  const changeFilter = (e) => {
    setFilter(() => e.target.id.replace('filter_', ''));
  };
  const addItem = (name, startingTime) => {
    setTodoItems(() => [...todoItems, createTodoItem(name, Number(new Date()), false, false, startingTime)]);
  };
  const deleteItem = (id) => {
    setTodoItems(() => todoItems.filter((elem) => elem.creationTime !== id));
  };

  const toogleCompleted = (id, value) => {
    setTodoItems((items) =>
      items.map((elem) => {
        const newElem = elem;
        if (elem.creationTime === id) newElem.completed = value || !newElem.completed;
        return newElem;
      })
    );
  };

  const editTask = (id) => {
    setTodoItems((items) =>
      items.map((elem) => {
        const newElem = elem;
        if (elem.creationTime === id) {
          newElem.editing = true;
          newElem.completed = false;
        }
        return newElem;
      })
    );
  };

  const clearCompletedTasks = () => {
    setTodoItems(() => todoItems.filter((elem) => !elem.completed));
  };

  const remainingItems = todoItems.filter((elem) => !elem.completed).length;

  let todoItemsShown;
  switch (filter) {
    case 'completed':
      todoItemsShown = todoItems.filter((elem) => elem.completed);
      break;
    case 'active':
      todoItemsShown = todoItems.filter((elem) => !elem.completed);
      break;
    default:
      todoItemsShown = todoItems;
  }

  return (
    <section className="todoapp">
      <Header addItem={addItem} />
      <section className="main">
        <TodoList
          todoItems={todoItemsShown}
          onDeleted={deleteItem}
          onToggleDone={toogleCompleted}
          editTodo={editTask}
          changeTodoLabel={changeTodoLabel}
        />
        <Footer changeFilter={changeFilter} onClickEvent={clearCompletedTasks} remainingItems={remainingItems} />
      </section>
    </section>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
