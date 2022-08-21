export default class UserInfo {
  constructor(settings) {
    this.nameObject = settings.nameObject;
    this.aboutObject = settings.aboutObject;
    this.avatarObject = settings.avatarObject;
  }

  setUserInfo(settings) {
    console.log("setUserInfo(settings)", settings);
    if (settings.name) {
      this.nameObject.textContent = settings.name;
      this.name = settings.name;
    }

    if (settings.about) {
      this.aboutObject.textContent = settings.about;
      this.about = settings.about;
    }

    if (settings.avatar) {
      this.avatar = settings.avatar;
      console.log("userInfo", this.avatar);
      this.avatarObject.setAttribute("src", this.avatar);
    }
    if (settings._id) {
      this.id = settings._id;
    }
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
