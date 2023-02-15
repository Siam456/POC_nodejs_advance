import models from "../../models";

let users = [
  {
    _id: "1",
    userName: "siam",
  },
];

export const getUsers = async () => {
  return users;
};

export const saveUser = async (userData) => {
  const user = new models.User(userData);
  users.push(user);

  return user;
};

export const getUserById = async (id) => {
  let model = users.find((x) => x._id.toString() === id);

  return model;
};

export const update = async (user) => {
  users[0].userName = user.userName;
  users[0].createdAt = new Date();
};

export const deleteById = async (id) => {
  const newUsers = users.filter((x) => x._id !== id);
  users = newUsers;
};
