import { Component } from "react";

import TodoList from "./components/TodoList.jsx";
import TodoContext from "./context/todoContext.js";
import Header from "./components/Header.jsx";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      name: 'Pesho'
    }

    this.toggleTodo = this.toggleTodo.bind(this); // to be sure that we are working with the correct this
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  componentDidMount() {
    console.log(`componentDidMount`);
    fetch("http://localhost:3030/jsonstore/todos")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          todos: Object.values(result)
        });
      });
  };

  toggleTodo(todoId) {
    this.setState({
      todos:this.state.todos.map(todo => todo.id === todoId ? {...todo, isCompleted: !todo.isCompleted} : todo)
    })
  }

  deleteTodo(todoId) {
    this.setState( {
      todos: this.state.todos.filter(todo => todo.id !== todoId),
    });
  }

  render() {
    //method - render
    return (
      <TodoContext.Provider value={{name: this.state.name, todos: this.state.todos}}>
      <Header/>

       <TodoList todos={this.state.todos} deleteTodo={this.deleteTodo.bind(this)}/>

      </TodoContext.Provider>
    );
  }
}

export default App;
