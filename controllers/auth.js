exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (user) {
      req.session.isAuthenticated  = true;
      req.session.user = { _id: user._id.toString() }; // Store only the user ID as a plain object
      return req.session.save((err) => {
        if (err) console.error(err);
        res.redirect("/bookshop");
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getLogin = (req, res, next) => {
  return res.render("auth/login", {
    PageTitle: "Login",
    isAuthenticated: req.session.isAuthenticated || false,
    invalid: false, // <== Always defined
  });
};

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.error(err);
    res.redirect("/login");
  });
};
