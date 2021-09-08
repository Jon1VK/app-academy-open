import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createTodo } from '../../slices/todosSlice';

export const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onTitleChange = (e) => setTitle(e.target.value);
  const onBodyChange = (e) => setBody(e.target.value);

  const dispatch = useDispatch();

  const onCreateTodoClick = async (e) => {
    e.preventDefault();
    dispatch(createTodo({ title, body }));
    setTitle('');
    setBody('');
  };

  return (
    <section>
      <h2>New Todo</h2>
      <form>
        <label htmlFor="todoTitle">Todo Title:</label>
        <input
          type="text"
          id="todoTitle"
          name="todoTitle"
          placeholder="What needs to be done?"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="todoBody">Body:</label>
        <textarea
          id="todoBody"
          name="todoBody"
          value={body}
          onChange={onBodyChange}
        />
        <button onClick={onCreateTodoClick}>Create Todo</button>
      </form>
    </section>
  );
};
