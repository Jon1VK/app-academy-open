import React from 'react';
import { StepForm } from './step_form';

import { StepListItem } from './step_list_item';

export const StepList = ({ steps, todoId }) => {
  const renderedSteps = steps.map((step) => (
    <StepListItem key={step.id} step={step} />
  ));

  return (
    <div>
      <h3>Steps</h3>
      <ul>{renderedSteps}</ul>
      <StepForm todoId={todoId} />
    </div>
  );
};
