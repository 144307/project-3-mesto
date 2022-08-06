export default class UserInfo {
  constructor(settings) {
    this.nameObject = settings.nameObject;
    this.aboutObject = settings.aboutObject;
    this.avatar = null;
    this.id = null;
    // this.getUserInfo = settings.getUserInfo;
    // console.log("this.getUserInfo", this.getUserInfo);
  }

  setUserInfo(settings) {
    this.nameObject.textContent = settings.name;
    this.aboutObject.textContent = settings.about;
    this.name = settings.name;
    this.about = settings.about;
    this.avatar = settings.avatar;
    this.id = settings._id;
  }

  getUserInfo() {
    const settings = {
      name: this.name,
      about: this.about,
      avatar: this.avatar,
      id: this.id,
    };
    return settings;
  }
}
