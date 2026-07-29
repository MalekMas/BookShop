const Book = require("../models/book");

exports.getDashboard = (req, res) => {
  res.redirect("/admin/books");
};

exports.getAddBook = (req, res, next) => {
  res.render("admin/add-book", { PageTitle: "Add Book Page" });
};

exports.postAddBook = async (req, res, next) => {
  const {
    title,
    price,
    author,
    genre,
    category,
    rating,
    publisher,
    publishedDate,
    isbn,
    imageUrl,
    description,
  } = req.body;

  try {
    const book = new Book({
      title,
      price,
      author,
      genre,
      category,
      rating,
      publisher,
      publishedDate,
      isbn,
      imageUrl,
      description,
    });
    await book.save();
    res.redirect("/admin/books");
  } catch (err) {
    next(err);
  }
};

exports.getEditBook = async (req, res) => {
  const bookId = req.params.bookId;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.redirect("/");

    res.render("admin/edit-book", {
      PageTitle: "Edit Book",
      book: book,
    });
  } catch (err) {
    console.error("Error getting book for editing:", err);
    res.redirect("/");
  }
};

exports.postEditBook = async (req, res) => {
  const {
    bookId,
    title,
    price,
    author,
    genre,
    category,
    rating,
    publisher,
    publishedDate,
    isbn,
    imageUrl,
    description,
  } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).send("Book not found.");

    book.title = title;
    book.price = price;
    book.author = author;
    book.genre = genre;
    book.category = category;
    book.rating = rating;
    book.publisher = publisher;
    book.publishedDate = publishedDate;
    book.isbn = isbn;
    book.imageUrl = imageUrl;
    book.description = description;

    await book.save();

    res.redirect("/admin/books");
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).send("Failed to update book.");
  }
};

exports.postDeleteBook = async (req, res) => {
  const { bookId } = req.body;

  try {
    await Book.findByIdAndDelete(bookId);
    res.redirect("/admin/books");
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).send("Failed to delete book.");
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.render("admin/displaybooks", {
      PageTitle: "Show All Books",
      books: books,
    });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(404).send("Error retrieving books.");
  }
};
