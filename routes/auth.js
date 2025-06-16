const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.post("/logout", authController.getLogout);

router.get("/signup", authController.getSignUp);
router.post("/signup", authController.postSignUp);

router.get("/profile", authController.getProfile);

// Show edit profile form
router.get("/profile/edit", authController.getEditProfile);

// Handle edit profile form submission
router.post("/profile/edit", authController.postEditProfile);
module.exports = router;
