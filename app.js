const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const shopRouter = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const errorController = require("./controllers/errors");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/bookshop", shopRouter);
app.use("/admin", adminRoutes);
app.use(errorController.get404);

app.listen(8080);
