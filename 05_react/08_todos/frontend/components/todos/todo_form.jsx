import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  receiveErrors,
  selectAllErrors,
} from '../../slices/errorsSlice';

import { createTodo } from '../../slices/todosSlice';

export const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onTitleChange = (e) => setTitle(e.target.value);
  const onBodyChange = (e) => setBody(e.target.value);

  const dispatch = useDispatch();

  const onCreateTodoClick = async (e) => {
    try {
      e.preventDefault();
      await dispatch(createTodo({ title, body })).unwrap();
      dispatch(clearErrors());
      setTitle('');
      setBody('');
    } catch (errors) {
      dispatch(receiveErrors(errors));
    }
  };

  const errors = useSelector(selectAllErrors);
  const renderedErrors = errors.map((error) => <li key={error}>{error}</li>);

  return (
    <section>
      <h2>New Todo</h2>
      {errors.length > 0 && <ul>{renderedErrors}</ul>}
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
