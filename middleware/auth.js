exports.requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  next();
};

exports.requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  if (req.user.role !== "admin") {
    return res.status(403).send("Administrator access is required.");
  }

  next();
};
