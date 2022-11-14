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
  startingTime,
}) {
  const classNames = [];
  const [timeLeft, setTimeLeft] = useState(Number(startingTime));
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
        if (timeLeft <= 0) {
          setIsCounting(false);
          setTimeLeft(startingTime);
          onToggleDone(creationTime, true);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isCounting, timeLeft]);
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
          onChange={() => {
            onToggleDone(creationTime);
            handleStop();
          }}
          id={`todo-${creationTime}`}
          // eslint-disable-next-line react/no-unknown-property
          checked={isCompleted}
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
        <button
          type="button"
          className="icon icon-edit"
          onClick={() => {
            editTodo(creationTime);
          }}
        />
        <button
          type="button"
          className="icon icon-destroy"
          onClick={() => {
            onDeleted(creationTime);
          }}
        />
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
