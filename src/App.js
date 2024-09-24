import React, { useState, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos((prevTodos) => [...prevTodos, inputValue]);
      setInputValue('');
    }
  };

  const handleClear = () => {
    localStorage.clear();
    setTodos([]);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className='contanier'>
      <h1>Project 4: Alışveriş Listesi</h1>
      <h3>Alınıcaklar Listesi</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          placeholder="Yeni bir madde ekleyin"
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>

      

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <IoCloseOutline 
              className='cancel' 
              onClick={() => handleDeleteTodo(index)} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
