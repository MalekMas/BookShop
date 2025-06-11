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
    description: "The obsessive quest of Captain Ahab to hunt the white whale.",
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

exports.getAddBook = (req, res, next) => {
  res.render("admin/add-book", { PageTitle: "Add Book Page" });
};

exports.postAddBook = (req, res, next) => {
  const { title, author, genre, imageUrl, description } = req.body;

  const newId = (books.length + 1).toString();

  const newBook = {
    _id: newId,
    title,
    author,
    genre,
    imageUrl,
    description,
  };

  books.push(newBook);
  res.redirect("/admin/books");
};

exports.getEditBook = (req, res, next) => {
  const bookId = req.params.bookId;

  const book = books.find((b) => b._id === bookId);

  if (!book) {
    return res.redirect("/");
  }

  res.render("admin/edit-book", {
    PageTitle: "Edit Book",
    book: book,
  });
};

exports.postEditBook = (req, res, next) => {
  const { bookId, title, author, genre, imageUrl, description } = req.body;

  const book = books.find((b) => b._id === bookId);
  if (!book) {
    return res.status(404).send("Book not found");
  }

  book.title = title;
  book.author = author;
  book.genre = genre;
  book.imageUrl = imageUrl;
  book.description = description;

  res.redirect("/admin/books");
};

exports.postDeleteBook = (req, res, next) => {
  const { bookId } = req.body;

  // Remove book from array by filtering
  const index = books.findIndex((b) => b._id === bookId);

  if (index === -1) {
    return res.status(404).send("Book not found");
  }

  books.splice(index, 1); // remove one item at found index
  res.redirect("/admin/books");
};

exports.getBooks = (req, res, next) => {
  res.render("admin/displaybooks", {
    PageTitle: "Show All Books",
    books: books,
  });
};
