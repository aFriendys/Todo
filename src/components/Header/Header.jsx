import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { label: '' };
  }

  onInputChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { label } = this.state;
    const { addItem } = this.props;
    e.preventDefault();

    if (label.trim().length) {
      addItem(label);
    }
    this.setState({
      label: '',
    });
  };

  render() {
    const { label } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onInputChange}
            className="new-todo"
            placeholder="What needs to be done?"
            value={label}
          />
        </form>
      </header>
    );
  }
}
