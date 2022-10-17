import myId from "./myId";

class Api {
  constructor(id) {
    this.link = id.link;
    this.headers = id.headers;
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ошибка");
  };

  getUserInfo() {
    return fetch(`${this.link}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this.link}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this._handleResponse);
  }

  setUserInfo(newUserData) {
    return fetch(`${this.link}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(newUserData),
    }).then(this._handleResponse);
  }

  addNewCard(newCard) {
    return fetch(`${this.link}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: `${newCard.name}`,
        link: `${newCard.link}`,
      }),
    }).then(this._handleResponse);
  }

  addNewAvatar(link) {
    return fetch(`${this.link}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(link),
    }).then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this.link}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify({
        _id: `${id}`,
      }),
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(id, like) {
    return fetch(`${this.link}/cards/${id}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this.headers,
      body: JSON.stringify({
        _id: `${id}`,
      }),
    }).then(this._handleResponse);
  }
}

const api = new Api(myId);

export default api;
