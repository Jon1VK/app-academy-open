export const fetchTodos = async () => {
  const response = await fetch('/api/todos');
  return await response.json();
};

export const createTodo = async (todo) => {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ todo }),
  });

  const data = await response.json();

  if (!response.ok) {
    Promise.reject(data);
  }

  return data;
};
