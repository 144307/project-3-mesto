export default class UserInfo {
  constructor(settings) {
    this.nameObject = settings.nameObject;
    this.aboutObject = settings.aboutObject;
    this.avatarObject = settings.avatarObject;
    // console.log("this.avatarObject", this.avatarObject);
  }

  setUserInfo(settings) {
    console.log("setUserInfo(settings)", settings);
    this.nameObject.textContent = settings.name;
    this.aboutObject.textContent = settings.about;
    this.name = settings.name;
    this.about = settings.about;
    if (settings.avatar) {
      this.avatar = settings.avatar;
      console.log("userInfo", this.avatar);
      this.avatarObject.setAttribute("src", this.avatar);
    }
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
