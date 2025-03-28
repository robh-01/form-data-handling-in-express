import userStorage from "../storages/userStorage.js";
import { body, validationResult } from "express-validator";

function userListGet(req, res) {
  const users = userStorage.getUsers();
  res.render("index", { title: "Users list", users: users });
}

function userCreateGet(req, res) {
  res.render("createUser", { title: "Create user" });
}

function userUpdateGet(req, res) {
  const user = userStorage.getUser(req.params.id);
  res.render("updateUser", { title: "Update user", user: user });
}

const alphaErr = "must only contain letters";
const lengthErr = "must be between 1 and 10 characters";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email address must be in proper format"),
  body("age")
    .optional({ values: "falsy" })
    .trim()
    .isInt({ min: 18, max: 120 })
    .withMessage("Age must be between 18 and 120"),
  body("bio")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 200 })
    .withMessage("Bio must be 200 characters or less"),
];

const userCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("createUser", { title: "Create user", errors: errors.array() });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    userStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];

const userUpdatePost = [
  validateUser,

  (req, res) => {
    const userId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: userStorage.getUser(userId),
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    userStorage.updateUser(userId, { firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];

function userDeletePost(req, res) {
  const userId = req.params.id;
  userStorage.deleteUser(userId);
  res.redirect("/");
}

function userSearchGet(req, res) {
  const searchEmail = req.query.email;
  const users = userStorage.getUsers();
  const foundUser = users.find(user => user.email === searchEmail);
  res.render("search", { 
    title: "Search Results",
    searchEmail,
    user: foundUser
  });
}

export {
  userListGet,
  userCreateGet,
  userCreatePost,
  userUpdateGet,
  userUpdatePost,
  userDeletePost,
  userSearchGet,
};
