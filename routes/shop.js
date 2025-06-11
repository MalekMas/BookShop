const express = require('express');
const router = express.Router();
const shopController = require("../controllers/shop");

router.get('/',shopController.getIndex);
router.get('/books',shopController.getBooks);
router.get('/books/:productId',shopController.getBook);
router.get('/cart',shopController.getCart);
router.post('/cart',shopController.postCart);
router.post('/cart-delete-item',shopController.postCartDeleteItem);
router.post('/create-order',shopController.postOrder);
router.get('/orders',shopController.getOrders);

module.exports = router;