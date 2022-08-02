export default class UserInfo {
  constructor(settings) {
    this.nameObject = settings.nameObject;
    this.aboutObject = settings.aboutObject;
    this.avatar = null;
    this.id = null;
    this.getUserInfo = settings.getUserInfo;
  }

  setUserInfo(settings) {
    this.nameObject.textContent = settings.name;
    this.aboutObject.textContent = settings.about;
  }
}
