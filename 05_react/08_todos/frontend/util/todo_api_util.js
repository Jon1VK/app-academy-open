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
    return Promise.reject(data);
  }

  return data;
};

export const toggleTodoDone = async (todo) => {
  const response = await fetch(`/api/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ todo: { ...todo, done: !todo.done } }),
  });
  return await response.json();
};

export const deleteTodo = async (todo) => {
  const response = await fetch(`/api/todos/${todo.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};
