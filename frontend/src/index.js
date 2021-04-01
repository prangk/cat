import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar.js'
import List from './components/List.js'
import Title from './components/Title.js'


const Cat = () => {
  const [cats, setCats] = useState([])
  const fetchCats = async () => {
    const response = await fetch("http://localhost:8000/cat")
    const cats = await response.json()

    setCats(cats.data[0])
  }

  useEffect(() => {
    fetchCats()
  }, [])

    return (
      <div>
       
        <Navbar />
        <Title />
        <List cats={cats}/>
  
        
      </div>
    );
}

ReactDOM.render(<Cat />, document.getElementById('root'));

/* <TodosContext.Provider value={{todos, fetchTodos}}>
    <Stack spacing={5}>
      {todos.map((todo) => (
        <b>{todo.item}</b>
      ))}
    </Stack>
  </TodosContext.Provider> */