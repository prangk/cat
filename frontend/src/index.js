import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar.js'
import List from './components/List.js'
import Title from './components/Title.js'
class Cat extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Title />
        <List />
      </div>
    );
  }
}

ReactDOM.render(<Cat />, document.getElementById('root'));
