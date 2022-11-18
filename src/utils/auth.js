const baseUrl = "https://auth.nomoreparties.co";
const headers = { "Content-Type": "application/json" };

function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export function signUp({ password, email }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ password, email }),
  }).then((res) => handleResponse(res));
}

export function signIn({ password, email }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ password, email }),
  }).then((res) => handleResponse(res));
}

export function getUserInfo(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => handleResponse(res));
}
