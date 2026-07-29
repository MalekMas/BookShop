const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const { requireAdmin } = require("../middleware/auth");

router.use(requireAdmin);
router.get("/", adminController.getDashboard);
router.get("/add-book", adminController.getAddBook);
router.get("/books", adminController.getBooks);
router.get("/edit-book/:bookId", adminController.getEditBook);
router.post("/edit-book", adminController.postEditBook);
router.post("/add-book", adminController.postAddBook);
router.post("/delete-book", adminController.postDeleteBook);

module.exports = router;
