const User = require("../models/users");

exports.getLogin = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return res.redirect("/bookshop");
  }

  return res.render("auth/login", {
    PageTitle: "Login",
    isAuthenticated: false,
    invalid: false,
  });
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (user) {
      req.session.isAuthenticated = true;
      req.session.user = {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        password: user.password,
      };
      return req.session.save((err) => {
        if (err) console.error(err);
        res.redirect("/bookshop");
      });
    }

    // Login failed
    return res.status(401).render("auth/login", {
      PageTitle: "Login",
      isAuthenticated: false,
      invalid: true, // set invalid to true
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.error(err);
    res.redirect("/");
  });
};

exports.getSignUp = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return res.redirect("/bookshop");
  }

  res.render("auth/signup", {
    PageTitle: "Sign Up",
    path: "/signup",
    errorMessage: null,
  });
};

exports.postSignUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(422).render("auth/signup", {
        PageTitle: "Sign Up",
        path: "/signup",
        errorMessage: "Email already exists. Please use a different one.",
      });
    }

    const user = new User({
      name: name,
      email: email,
      password: password, // storing raw password (NOT secure)
      cart: { items: [] },
    });

    await user.save();
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getProfile = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("auth/profile", {
    pageTitle: "Your Profile",
    user: req.session.user,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getEditProfile = (req, res) => {
  res.render("auth/edit-profile", {
    user: req.user,
    pageTitle: "Edit Profile",
  });
};

exports.postEditProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = req.user;

    // Update user info (assuming you use Mongoose and req.user is populated)
    user.name = name;
    user.email = email;

    await user.save();

    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    res.status(404).send("Server Error");
  }
};
