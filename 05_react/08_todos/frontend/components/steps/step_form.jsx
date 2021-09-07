import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { receiveStep } from '../../slices/stepsSlice';
import { uniqueId } from '../../util/util';

export const StepForm = ({ todoId }) => {
  const [title, setTitle] = useState('');

  const onTitleChange = (e) => setTitle(e.target.value);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const step = {
      id: uniqueId(),
      todo_id: todoId,
      done: false,
      title,
    };
    dispatch(receiveStep(step));
    setTitle('');
  };

  return (
    <section>
      <form>
        <input
          type="text"
          id="stepTitle"
          name="stepTitle"
          placeholder="What step needs to be taken?"
          value={title}
          onChange={onTitleChange}
        />
        <button onClick={onSubmit}>Create Step</button>
      </form>
    </section>
  );
};
