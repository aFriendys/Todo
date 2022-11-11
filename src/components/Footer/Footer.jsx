import React from 'react';

import Filters from '../Filters';
import './Footer.css';

function Footer({ onClickEvent, remainingItems, changeFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {remainingItems > 0 ? `${remainingItems} case(s) left` : 'You have done all your deeds'}
      </span>
      <Filters changeFilter={changeFilter} />
      <button type="button" className="clear-completed" onClick={onClickEvent}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
