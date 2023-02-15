import models from "../models";
import { NotFound } from "../utils/errors";

export const saveUser = async (userData) => {
  const user = new models.User(userData);
  const _user = await user.save();

  return _user;
};

export const getUsers = async () => {
  return models.User.find();
};

export const update = async (user) => {
  const id = user.id;
  const User = models.User;
  let model = await User.findById(id);
  if (model) {
    model.userName = user.userName;
    await model.save();
    return model._id;
  }

  throw new NotFound("User not found by the id: " + id);
};

export const deleteById = async (id) => {
  const User = models.User;
  let model = await User.findById({ _id: id });
  if (model) {
    let result = await User.deleteOne({ _id: id });
    return result;
  }

  throw new NotFound("User not found by the id: " + id);
};

export const getUserById = async (id) => {
  const User = models.User;
  let model = await User.findById(id);
  //   let viewModel = new UserViewModel(model);
  return model;
};
