import React from 'react';

import TodoListItem from '../TodoListItem';
import './TodoList.css';

function TodoList({ todoItems, onDeleted, onToggleDone, editTodo, changeTodoLabel }) {
  return (
    <ul className="todo-list">
      {todoItems.map((elem) => (
        <TodoListItem
          label={elem.label}
          isCompleted={elem.completed}
          isEditing={elem.editing}
          creationTime={elem.creationTime}
          key={elem.creationTime}
          editTodo={editTodo}
          onToggleDone={onToggleDone}
          onDeleted={onDeleted}
          changeTodoLabel={changeTodoLabel}
          startingTime={elem.startingTime}
        />
      ))}
    </ul>
  );
}

export default TodoList;
