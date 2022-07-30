export default class UserInfo {
  constructor(selector) {
    this.nameSelector = selector.nameSelector;
    this.aboutSelector = selector.aboutSelector;
    this.avatar = null;
    this.id = null;
  }

  setUserInfo(settings) {
    this.nameSelector.textContent = settings.name;
    this.aboutSelector.textContent = settings.about;
  }
}
