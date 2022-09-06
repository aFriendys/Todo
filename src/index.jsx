import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { formatDistance } from 'date-fns';

import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import './styles.css';

class App extends Component {
  static createTodoItem(label, creationTime, completed, editing) {
    const dateDistance = formatDistance(new Date(), new Date(Number(creationTime)));
    return {
      label,
      creationTime,
      completed,
      editing,
      dateDistance: `in ${dateDistance}`,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      todoItems: [
        App.createTodoItem('Completed task', '1661357995014', false, false),
        App.createTodoItem('Editing task', '1661357995614', false, false),
        App.createTodoItem('Active task', '1661358014766', false, false),
      ],
      filter: 'all',
    };
  }

  changeTodoLabel = (id, value) => {
    this.setState(({ todoItems }) => {
      const newArr = todoItems.map((elem) => {
        const newElem = elem;
        if (newElem.creationTime === id) {
          newElem.editing = false;
          newElem.label = value;
        }
        return newElem;
      });
      return { todoItems: newArr };
    });
  };

  editTodo = (id) => {
    this.setState(({ todoItems }) => {
      const newArr = todoItems.map((elem) => {
        const newElem = elem;
        if (newElem.creationTime === id) {
          newElem.editing = true;
          newElem.completed = false;
        }
        return newElem;
      });
      return { todoItems: newArr };
    });
  };

  changeFilter = (e) => {
    this.setState(() => ({ filter: e.target.id.replace('filter_', '') }));
  };

  changeDateDistance = () => {
    this.setState(() => {
      const { todoItems } = this.state;
      const newArr = todoItems.map((elem) => {
        const newElem = elem;
        const distance = formatDistance(new Date(), new Date(Number(newElem.creationTime)), { addSuffix: true });

        newElem.dateDistance = distance;
        return newElem;
      });
      return { todoItems: newArr };
    });
  };

  addItem = (name) => {
    this.setState(({ todoItems }) => {
      const item = App.createTodoItem(name, Number(new Date()), false, false);
      return {
        todoItems: [...todoItems, item],
      };
    });
  };

  onDeleted = (id) => {
    this.setState(({ todoItems }) => {
      const newArr = todoItems.filter((elem) => elem.creationTime !== id);
      return { todoItems: newArr };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoItems }) => {
      const newArr = todoItems.map((elem) => {
        const newElem = elem;
        if (newElem.creationTime === id) {
          newElem.completed = !elem.completed;
        }
        return newElem;
      });
      return { todoItems: newArr };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoItems }) => {
      const newArr = todoItems.filter((elem) => !elem.completed);
      return { todoItems: newArr };
    });
  };

  render() {
    const { todoItems, filter } = this.state;

    setInterval(() => {
      this.changeDateDistance();
    }, 10000);

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
        <Header addItem={this.addItem} />
        <section className="main">
          <TodoList
            todoItems={todoItemsShown}
            onDeleted={this.onDeleted}
            onToggleDone={this.onToggleDone}
            editTodo={this.editTodo}
            changeTodoLabel={this.changeTodoLabel}
          />
          <Footer changeFilter={this.changeFilter} onClickEvent={this.clearCompleted} remainingItems={remainingItems} />
        </section>
      </section>
    );
  }
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
