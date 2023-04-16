// const baseUrl = "https://auth.nomoreparties.co";
// const headers = { "Content-Type": "application/json" };
// import baseData from "./baseData";
// const baseUrl = baseData.link;
// const headers = baseData.headers;
const baseUrl = 'https://api.kogrms.nomoredomains.monster';

function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export function signUp({ password, email }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => handleResponse(res));
}

export function signIn({ password, email }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  }).then((res) => handleResponse(res));
}

export function getUserInfo(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  }).then((res) => handleResponse(res));
}
