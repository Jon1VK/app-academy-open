import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createStep } from '../../slices/stepsSlice';

export const StepForm = ({ todoId }) => {
  const [title, setTitle] = useState('');

  const onTitleChange = (e) => setTitle(e.target.value);

  const dispatch = useDispatch();

  const onCreateStepClick = async (e) => {
    e.preventDefault();
    await dispatch(createStep({ title, todo_id: todoId }));
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
        <button onClick={onCreateStepClick}>Create Step</button>
      </form>
    </section>
  );
};
