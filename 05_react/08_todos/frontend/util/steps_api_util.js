export const fetchSteps = async () => {
  const response = await fetch('/api/steps');
  return await response.json();
};

export const createStep = async (step) => {
  const response = await fetch('/api/steps', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ step }),
  });

  const data = await response.json();

  if (!response.ok) {
    return Promise.reject(data);
  }

  return data;
};

export const toggleStepDone = async (step) => {
  const response = await fetch(`/api/steps/${step.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ step: { ...step, done: !step.done } }),
  });
  return await response.json();
};

export const deleteStep = async (step) => {
  const response = await fetch(`/api/steps/${step.id}`, {
    method: 'DELETE',
  });
  return await response.json();
};
