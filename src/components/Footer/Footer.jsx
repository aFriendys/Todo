import React from 'react';

import Filters from '../Filters';
import './Footer.css';

function Footer({ onClickEvent, remainingItems, changeFilter }) {
  let todoCount = <span className="todo-count">You&#39; done all your deeds</span>;

  if (remainingItems) {
    todoCount = <span className="todo-count">{remainingItems} case(s) left</span>;
  }

  return (
    <footer className="footer">
      {todoCount}
      <Filters changeFilter={changeFilter} />
      <button type="button" className="clear-completed" onClick={onClickEvent}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
