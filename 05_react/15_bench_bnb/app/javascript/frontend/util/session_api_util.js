import csrf_token from './csrf_token';

export const signup = async (user) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'X-CSRF-Token': csrf_token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  });

  const jsonResponse = await response.json();

  if (!response.ok) {
    return Promise.reject(jsonResponse);
  } else {
    return jsonResponse;
  }
};

export const login = async (user) => {
  const response = await fetch('/api/session', {
    method: 'POST',
    headers: {
      'X-CSRF-Token': csrf_token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  });

  const jsonResponse = await response.json();

  if (!response.ok) {
    return Promise.reject(jsonResponse);
  } else {
    return jsonResponse;
  }
};

export const logout = async () => {
  const response = await fetch('/api/session', {
    method: 'DELETE',
    headers: {
      'X-CSRF-Token': csrf_token,
    },
  });

  const jsonResponse = await response.json();

  if (!response.ok) {
    return Promise.reject(jsonResponse);
  } else {
    return jsonResponse;
  }
};
