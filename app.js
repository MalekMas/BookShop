const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const shopRouter = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const errorController = require("./controllers/errors");
const mongoose = require("mongoose");
const User = require("./models/users");
const authRoutes = require("./routes/auth");

const expressSession = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(expressSession);
const mdbsession = MongoDBSession({
  uri: "mongodb://localhost:27017/shop",
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  expressSession({
    secret: "Malek",
    resave: false,
    saveUninitialized: false,
    store: mdbsession,
  })
);

// Make session info available in views
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated || false;
  res.locals.user = req.session.user || null;
  next();
});

app.use(async (req, res, next) => {
  console.log("Session user:", req.session.user); // Debug log
  if (!req.session.user || !req.session.user._id) {
    return next();
  }

  try {
    const user = await User.findById(req.session.user._id);
    if (user) {
      req.user = user;
      console.log("User loaded:", user.email); // Debug log
    }
    next();
  } catch (err) {
    console.error("Error loading session user:", err);
    next(err);
  }
});

app.use(authRoutes);
app.use("/bookshop", shopRouter);
app.use("/admin", adminRoutes);

app.use(errorController.get404);

mongoose
  .connect("mongodb://localhost:27017/BookShop")
  .then(() => {
    console.log("Connect Successfully!");

    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((err) => console.error("MongoDB connection error: ", err));
