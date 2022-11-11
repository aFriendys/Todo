import { useEffect, useState } from 'react';
import './TodoListItem.css';
import { formatDistanceToNow } from 'date-fns';

function TodoListItem({
  label,
  onDeleted,
  onToggleDone,
  isEditing,
  isCompleted,
  editTodo,
  creationTime,
  changeTodoLabel,
}) {
  const classNames = [];
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [dateDistance, setDatedistance] = useState(`${formatDistanceToNow(new Date(Number(creationTime)))} ago`);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft - minutes * 60;
  if (isCompleted) {
    classNames.push('completed');
  }
  if (isEditing) {
    classNames.push('editing');
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDatedistance(formatDistanceToNow(new Date(Number(creationTime)), { addSuffix: true }));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [dateDistance]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isCounting) {
        setTimeLeft((timeleft) => timeleft + 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isCounting]);
  const handleStart = () => {
    setIsCounting(true);
  };
  const handleStop = () => {
    setIsCounting(false);
  };
  return (
    <li className={classNames.join(' ')}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onClick={onToggleDone}
          id={`todo-${creationTime}`}
          // eslint-disable-next-line react/no-unknown-property
          defaultChecked={isCompleted}
        />
        <label htmlFor={`todo-${creationTime}`}>
          <span className="title">{label}</span>
          <span className="description">
            {isCounting ? (
              <button type="button" className="icon icon-pause" onClick={handleStop} />
            ) : (
              <button type="button" className="icon icon-play" onClick={handleStart} />
            )}
            {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
          </span>
          <span className="created">created in {dateDistance}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={editTodo} />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      {isEditing && (
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
      )}
    </li>
  );
}

export default TodoListItem;
