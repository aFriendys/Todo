import React, { useState } from 'react';
import './Header.css';

function Header({ addItem }) {
  const [newTodo, changeNewTodo] = useState({ label: '', minutes: '', seconds: '' });
  const onLabelChange = (e) => {
    changeNewTodo((v) => ({ ...v, label: e.target.value }));
  };

  const onMinutesChange = (e) => {
    changeNewTodo((v) => ({ ...v, minutes: e.target.value > 99 ? 99 : e.target.value }));
  };

  const onSecondsChange = (e) => {
    changeNewTodo((v) => ({ ...v, seconds: e.target.value > 59 ? 59 : e.target.value }));
  };

  const createNewTask = (e) => {
    if (e.code !== 'Enter') {
      return;
    }

    if (newTodo.label.trim().length) {
      addItem(newTodo.label, Number(newTodo.minutes) * 60 + Number(newTodo.seconds));
      changeNewTodo(() => ({ label: '', minutes: '', seconds: '' }));
    }
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="Task"
          value={newTodo.label}
          onChange={onLabelChange}
          onKeyDown={createNewTask}
        />
        <input
          type="number"
          min="0"
          max="99"
          className="new-todo-form__timer"
          placeholder="Min"
          value={newTodo.minutes}
          onChange={onMinutesChange}
          onKeyDown={createNewTask}
        />
        <input
          type="number"
          min="0"
          max="59"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={newTodo.seconds}
          onChange={onSecondsChange}
          onKeyDown={createNewTask}
        />
      </form>
    </header>
  );
}

export default Header;
