import API from "./api";

const APIconfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-6",
  headers: {
    authorization: "230ea98f-ed00-4030-a408-2ee71d4ed161",
    "Content-Type": "application/json",
  },
};
const MyAPI = new API(APIconfig);

export default class UserInfo {
  constructor(selector) {
    this.nameSelector = selector.nameSelector;
    this.aboutSelector = selector.aboutSelector;
  }

  setUserInfo(settings) {
    MyAPI.changeProfile(settings.name, settings.about).then(() => {
      this.nameSelector.textContent = settings.name;
      this.aboutSelector.textContent = settings.about;
    });
  }
}
