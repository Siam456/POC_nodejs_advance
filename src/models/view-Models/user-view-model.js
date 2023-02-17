export class UserViewModel {
  constructor(user) {
    this.id = user._id;
    this.userName = user.userName;
    this.createdAt = user.createdAt;
  }
}
