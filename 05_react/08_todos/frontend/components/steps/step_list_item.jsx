import React from 'react';
import { useDispatch } from 'react-redux';

import { removeStep, toggleStepDone } from '../../slices/stepsSlice';

export const StepListItem = ({ step }) => {
  const dispatch = useDispatch();

  const onRemoveStepClick = () => dispatch(removeStep(step.id));
  const onToggleStepDoneClick = () => {
    dispatch(toggleStepDone(step.id));
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
