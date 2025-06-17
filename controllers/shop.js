const Book = require("../models/book");

exports.getIndex = (req, res, next) => {
  res.render("shop/index", { PageTitle: "Shop Home" });
};

app.get('/bookshop/books', async (req, res) => {
  const { search, category } = req.query;

  // Build filter object
  let filter = {};

  if (search) {
    // Search by title or author (case-insensitive partial match)
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { author: { $regex: search, $options: 'i' } }
    ];
  }

  if (category && category.trim() !== '') {
    filter.genre = category;
  }

  try {
    const books = await Book.find(filter).exec();

    res.render('bookshop/books', {
      PageTitle: 'Books',
      books,
      search,
      category
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});



exports.getBook = (req, res, next) => {};

exports.getCart = async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  try {
    await req.user.populate("cart.items.productId");
    const user = req.user;

    const cartItems = user.cart.items.map((item) => ({
      _id: item.productId._id,
      title: item.productId.title,
      price: item.productId.price || 10,
      imageUrl: item.productId.imageUrl,
      quantity: item.quantity,
    }));

    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    res.render("shop/cart", {
      PageTitle: "Your Cart",
      cartItems,
      totalPrice,
    });
  } catch (err) {
    console.error(err);
    res.status(404).send("Failed to load cart");
  }
};

exports.postCart = async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  const bookId = req.body.bookId;

  try {
    const user = req.user;
    // Check if book already in cart
    const cartItemIndex = user.cart.items.findIndex(
      (item) => item.productId.toString() === bookId
    );
    if (cartItemIndex >= 0) {
      user.cart.items[cartItemIndex].quantity += 1;
    } else {
      user.cart.items.push({ productId: bookId, quantity: 1 });
    }
    await user.save();
    res.redirect("/bookshop/cart");
  } catch (err) {
    console.error(err);
    res.status(404).send("Failed to add to cart");
  }
};

exports.postCartDeleteItem = async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const bookId = req.body.bookId;
  try {
    const user = req.user;
    user.cart.items = user.cart.items.filter(
      (item) => item.productId.toString() !== bookId
    );
    await user.save();
    res.redirect("/bookshop/cart");
  } catch (err) {
    console.error(err);
    res.status(404).send("Failed to delete item from cart");
  }
};

exports.getOrders = (req, res, next) => {
  const orders = [
    {
      id: "001",
      date: "2025-06-10",
      items: [
        { title: "The Great Gatsby", quantity: 1 },
        { title: "Pride and Prejudice", quantity: 2 },
      ],
      total: 45,
    },
    {
      id: "002",
      date: "2025-06-05",
      items: [{ title: "To Kill a Mockingbird", quantity: 1 }],
      total: 15,
    },
  ];

  res.render("shop/orders", {
    PageTitle: "Your Orders",
    orders: orders,
  });
};

exports.getBookDetails = async (req, res, next) => {
  const bookId = req.params.bookId;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).render("404", { PageTitle: "Book Not Found" });
    }
    res.render("shop/book-details", {
      book: book,
      PageTitle: book.title,
    });
  } catch (err) {
    console.error(err);
    res.status(404).render("404", { PageTitle: "Error" });
  }
};

exports.getBuy = async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  const bookId = req.params.bookId;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send("Book not found");
    }

    const user = req.user;

    const cartItemIndex = user.cart.items.findIndex(
      (item) => item.productId.toString() === bookId
    );

    if (cartItemIndex >= 0) {
      user.cart.items[cartItemIndex].quantity += 1;
    } else {
      user.cart.items.push({ productId: bookId, quantity: 1 });
    }

    await user.save();
    res.redirect("/bookshop/cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding book to cart");
  }
};

exports.postOrder = (req, res, next) => {};
