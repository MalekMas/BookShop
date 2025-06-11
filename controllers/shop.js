  const books = [
    {
      _id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic",
      imageUrl: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
      description: "A novel about the American dream and the roaring twenties.",
    },
    {
      _id: "2",
      title: "Educated",
      author: "Tara Westover",
      genre: "Memoir",
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81WojUxbbFL.jpg",
      description:
        "A woman raised in isolation breaks away from her survivalist family to pursue education.",
    },
    {
      _id: "3",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Classic",
      imageUrl: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
      description:
        "A powerful story of racial injustice and childhood innocence in the Deep South.",
    },
    {
      _id: "4",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      imageUrl: "https://covers.openlibrary.org/b/id/8091016-L.jpg",
      description:
        "A witty commentary on manners, marriage, and morality in 19th century England.",
    },
    {
      _id: "5",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      imageUrl: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
      description:
        "Bilbo Baggins embarks on a quest filled with adventure, dragons, and treasure.",
    },
    {
      _id: "6",
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      genre: "Dystopian",
      imageUrl: "https://covers.openlibrary.org/b/id/9251996-L.jpg",
      description: "A society where books are banned and “firemen” burn them.",
    },
    {
      _id: "7",
      title: "Moby-Dick",
      author: "Herman Melville",
      genre: "Adventure",
      imageUrl: "https://covers.openlibrary.org/b/id/8101343-L.jpg",
      description:
        "The obsessive quest of Captain Ahab to hunt the white whale.",
    },
    {
      _id: "8",
      title: "Jane Eyre",
      author: "Charlotte Brontë",
      genre: "Gothic",
      imageUrl: "https://covers.openlibrary.org/b/id/8231991-L.jpg",
      description:
        "A strong-willed orphan girl’s journey to self-respect and love.",
    },
    {
      _id: "9",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Fiction",
      imageUrl: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
      description: "A teenager’s cynical and sensitive perspective on life.",
    },
    {
      _id: "10",
      title: "Brave New World",
      author: "Aldous Huxley",
      genre: "Science Fiction",
      imageUrl: "https://covers.openlibrary.org/b/id/8775043-L.jpg",
      description:
        "A dystopian future where society is engineered for conformity and control.",
    },
    {
      _id: "11",
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      imageUrl: "https://covers.openlibrary.org/b/id/8231993-L.jpg",
      description:
        "Epic saga of the quest to destroy the One Ring and save Middle-earth.",
    },
    {
      _id: "12",
      title: "Animal Farm",
      author: "George Orwell",
      genre: "Political Satire",
      imageUrl: "https://covers.openlibrary.org/b/id/8228697-L.jpg",
      description:
        "A satirical allegory of the Russian Revolution using farm animals.",
    },
    {
      _id: "13",
      title: "Wuthering Heights",
      author: "Emily Brontë",
      genre: "Gothic",
      imageUrl: "https://covers.openlibrary.org/b/id/8231975-L.jpg",
      description:
        "A dark tale of passionate and destructive love on the Yorkshire moors.",
    },
    {
      _id: "14",
      title: "The Chronicles of Narnia",
      author: "C.S. Lewis",
      genre: "Fantasy",
      imageUrl: "https://covers.openlibrary.org/b/id/8232001-L.jpg",
      description:
        "Children discover a magical world filled with adventure and myth.",
    },
    {
      _id: "15",
      title: "The Alchemist",
      author: "Paulo Coelho",
      genre: "Adventure",
      imageUrl: "https://covers.openlibrary.org/b/id/8373223-L.jpg",
      description:
        "A shepherd’s journey to discover his personal legend and true destiny.",
    },
  ];
  let cart = {
    items: [],
  };

exports.getIndex = (req, res, next) => {
  res.render("shop/index", { PageTitle: "Shop Home" });
};

exports.getBooks = (req, res, next) => {
  res.render("shop/displayuser", {
    PageTitle: "All Books",
    books: books,
  });
};

exports.getBook = (req, res, next) => {};

exports.getCart = (req, res, next) => {

  const cartItems = cart.items.map((item) => {
    const book = books.find((b) => b._id === item.bookId);
    return {
      _id: book._id,
      title: book.title,
      price: book.price || 10, // or your price field if exists
      imageUrl: book.imageUrl,
      quantity: item.quantity,
    };
  });

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  res.render("shop/cart", {
    PageTitle: "Your Cart",
    cartItems,
    totalPrice,
  });
};

exports.postCart = (req, res, next) => {
  const bookId = req.body.bookId;

  const existingItemIndex = cart.items.findIndex(item => item.bookId === bookId);
  if (existingItemIndex >= 0) {
    cart.items[existingItemIndex].quantity++;
  } else {
    cart.items.push({ bookId: bookId, quantity: 1 });
  }

  res.redirect('/bookshop/cart');
};

exports.postCartDeleteItem = (req, res, next) => {
  const bookId = req.body.bookId;

  cart.items = cart.items.filter(item => item.bookId !== bookId);

  res.redirect('/bookshop/cart');
};

exports.getOrders = (req, res, next) => {
  // Example static orders
  const orders = [
    {
      id: '001',
      date: '2025-06-10',
      items: [
        { title: 'The Great Gatsby', quantity: 1 },
        { title: 'Pride and Prejudice', quantity: 2 }
      ],
      total: 45
    },
    {
      id: '002',
      date: '2025-06-05',
      items: [
        { title: 'To Kill a Mockingbird', quantity: 1 }
      ],
      total: 15
    }
  ];

  res.render('shop/orders', {
    PageTitle: 'Your Orders',
    orders: orders
  });
};

exports.postOrder = (req, res, next) => {};
