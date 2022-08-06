export default class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  getUserInfo() {
    return fetch(this.baseUrl + "/users/me", {
      method: "GET",
      headers: this.headers,
    }).then(this.checkResponse);
  }

  getInitialCards() {
    return Promise.all([
      fetch(this.baseUrl + "/cards", {
        method: "GET",
        headers: this.headers,
      })
        .then(this.checkResponse)
        .catch((error) => {
          console.error("Error:", error);
        }),
      fetch(this.baseUrl + "/users/me", {
        method: "GET",
        headers: this.headers,
      }).then(this.checkResponse),
    ]);
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  changeProfile(newName, newAbout) {
    console.log("changeProfile");
    console.log("newName =", newName);
    console.log("newAbout =", newAbout);
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    }).then(this.checkResponse);
  }

  addCard(name, link) {
    console.log("addCard");
    console.log("name =", name);
    console.log("link =", link);
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        // name: "Marie Skłodowska Curie",
        // name: "fffdf",
        // link: "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
        name: name,
        link: link,
      }),
    }).then(this.checkResponse);
  }

  deleteCard(cardId) {
    console.log("BIG TEST deleteCard");
    console.log("deleteCard:", cardId);
    return fetch(this.baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this.checkResponse)
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  giveLike(cardId) {
    console.log("giveLike:", cardId);
    return fetch(this.baseUrl + "/cards/likes/" + cardId, {
      method: "PUT",
      headers: this.headers,
    }).then(this.checkResponse);
  }

  removeLike(cardId) {
    console.log("removeLike:", cardId);
    return fetch(this.baseUrl + "/cards/likes/" + cardId, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.checkResponse);
  }

  updateAvatar(avatarUrl) {
    console.log("updateAvatar");
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then(this.checkResponse);
  }
}
