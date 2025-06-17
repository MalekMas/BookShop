const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");


router.get("/", shopController.getIndex);
router.get("/books", shopController.getBooks);
router.get("/book-details/:bookId", shopController.getBookDetails);
router.get("/buy/:bookId", shopController.getBuy);
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);
router.post("/cart-delete-item", shopController.postCartDeleteItem);
router.post("/create-order", shopController.postOrder);
router.get("/orders", shopController.getOrders);

module.exports = router;
