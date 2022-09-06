import React from 'react';
import './TodoListItem.css';

function TodoListItem({
  label,
  onDeleted,
  onToggleDone,
  isEditing,
  isCompleted,
  dateDistance,
  editTodo,
  creationTime,
  changeTodoLabel,
}) {
  let classNames = '';

  if (isCompleted) {
    classNames += 'completed';
  }

  if (isEditing) {
    classNames += 'editing';
  }

  const editInput = (
    <input
      type="text"
      className="edit"
      defaultValue={label}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          changeTodoLabel(creationTime, e.target.value);
        }
      }}
    />
  );
  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} id={`todo-${creationTime}`} />
        <label htmlFor={`todo-${creationTime}`}>
          <span className="description">{label}</span>
          <span className="created">created {dateDistance} ago</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={editTodo} />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      {classNames === 'editing' ? editInput : false}
    </li>
  );
}

export default TodoListItem;
