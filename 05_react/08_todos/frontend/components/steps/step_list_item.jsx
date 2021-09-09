import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteStep, toggleStepDone } from '../../slices/stepsSlice';

export const StepListItem = ({ step }) => {
  const dispatch = useDispatch();

  const onRemoveStepClick = () => dispatch(deleteStep(step));
  const onToggleStepDoneClick = () => {
    dispatch(toggleStepDone(step));
  };

  return (
    <li>
      {step.title}
      <button onClick={onToggleStepDoneClick}>
        {step.done ? 'Undo' : 'Done'}
      </button>
      <button onClick={onRemoveStepClick}>Remove</button>
    </li>
  );
};
