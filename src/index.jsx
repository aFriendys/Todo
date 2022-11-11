/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import './styles.css';

function App() {
  const createTodoItem = (label, creationTime, completed, editing) => ({
    label,
    creationTime,
    completed,
    editing,
  });

  const [todoItems, setTodoItems] = useState([
    createTodoItem('Task 1', '1661357995014', true, false),
    createTodoItem('Task 2', '1661357995614', true, false),
    createTodoItem('Task 3', '1661358014766', false, false),
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
  const addItem = (name) => {
    setTodoItems(() => [...todoItems, createTodoItem(name, Number(new Date()), false, false)]);
  };
  const deleteItem = (id) => {
    setTodoItems(() => todoItems.filter((elem) => elem.creationTime !== id));
  };

  const toogleCompleted = (id) => {
    setTodoItems((items) =>
      items.map((elem) => {
        const newElem = elem;
        if (elem.creationTime === id) newElem.completed = !newElem.completed;
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
