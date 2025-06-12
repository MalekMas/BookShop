const Book = require('../models/book');

exports.getAddBook = (req, res, next) => {
  res.render("admin/add-book", { PageTitle: "Add Book Page" });
};

exports.postAddBook = async (req, res) => {
  const { title, author, genre, imageUrl, description } = req.body;
  const book = new Book({ title, author, genre, imageUrl, description });
  await book.save();
  res.redirect('/admin/books');
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
  const { bookId, title, author, genre, imageUrl, description } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).send("Book not found.");

    book.title = title;
    book.author = author;
    book.genre = genre;
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
