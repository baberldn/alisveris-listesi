import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";

const App = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTodos = [...todos, inputValue];
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
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
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
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
