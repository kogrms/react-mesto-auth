import baseData from "./baseData";

class Api {
  constructor(id) {
    this.baseUrl = id.baseUrl;
    this.headers = id.headers;
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ошибка");
  };

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this._handleResponse);
  }

  setUserInfo(newUserData) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(newUserData),
    }).then(this._handleResponse);
  }

  addNewCard(newCard) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: `${newCard.name}`,
        link: `${newCard.link}`,
      }),
    }).then(this._handleResponse);
  }

  addNewAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(link),
    }).then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify({
        _id: `${id}`,
      }),
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(id, like) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this.headers,
      body: JSON.stringify({
        _id: `${id}`,
      }),
    }).then(this._handleResponse);
  }

  checkToken (token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((this._handleResponse))
    .then((res) => {
      if (res.data.email){
        return res;
      }
    });
  };

  updateToken() {
    this.headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  }
}

const api = new Api(baseData);

export default api;
