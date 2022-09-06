import React from 'react';

import TodoListItem from '../TodoListItem';
import './TodoList.css';

function TodoList({ todoItems, onDeleted, onToggleDone, editTodo, changeTodoLabel }) {
  const elements = todoItems.map((elem) => (
    <TodoListItem
      label={elem.label}
      dateDistance={elem.dateDistance}
      isCompleted={elem.completed}
      isEditing={elem.editing}
      creationTime={elem.creationTime}
      key={elem.creationTime}
      editTodo={() => editTodo(elem.creationTime)}
      onToggleDone={() => onToggleDone(elem.creationTime)}
      onDeleted={() => onDeleted(elem.creationTime)}
      changeTodoLabel={changeTodoLabel}
    />
  ));
  return <ul className="todo-list">{elements}</ul>;
}

export default TodoList;
