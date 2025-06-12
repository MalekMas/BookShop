const mongoose = require('mongoose');
const Book = require('./models/book'); // adjust the path if needed

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    imageUrl: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    description: "A novel about the American dream and the roaring twenties.",
  },
  {
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/81WojUxbbFL.jpg",
    description:
      "A woman raised in isolation breaks away from her survivalist family to pursue education.",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    imageUrl: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
    description:
      "A powerful story of racial injustice and childhood innocence in the Deep South.",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    imageUrl: "https://covers.openlibrary.org/b/id/8091016-L.jpg",
    description:
      "A witty commentary on manners, marriage, and morality in 19th century England.",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    imageUrl: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
    description:
      "Bilbo Baggins embarks on a quest filled with adventure, dragons, and treasure.",
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    genre: "Dystopian",
    imageUrl: "https://covers.openlibrary.org/b/id/9251996-L.jpg",
    description: "A society where books are banned and “firemen” burn them.",
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    genre: "Adventure",
    imageUrl: "https://covers.openlibrary.org/b/id/8101343-L.jpg",
    description: "The obsessive quest of Captain Ahab to hunt the white whale.",
  },
  {
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    genre: "Gothic",
    imageUrl: "https://covers.openlibrary.org/b/id/8231991-L.jpg",
    description:
      "A strong-willed orphan girl’s journey to self-respect and love.",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    imageUrl: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
    description: "A teenager’s cynical and sensitive perspective on life.",
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Science Fiction",
    imageUrl: "https://covers.openlibrary.org/b/id/8775043-L.jpg",
    description:
      "A dystopian future where society is engineered for conformity and control.",
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    imageUrl: "https://covers.openlibrary.org/b/id/8231993-L.jpg",
    description:
      "Epic saga of the quest to destroy the One Ring and save Middle-earth.",
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    genre: "Political Satire",
    imageUrl: "https://covers.openlibrary.org/b/id/8228697-L.jpg",
    description:
      "A satirical allegory of the Russian Revolution using farm animals.",
  },
  {
    title: "Wuthering Heights",
    author: "Emily Brontë",
    genre: "Gothic",
    imageUrl: "https://covers.openlibrary.org/b/id/8231975-L.jpg",
    description:
      "A dark tale of passionate and destructive love on the Yorkshire moors.",
  },
  {
    title: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    genre: "Fantasy",
    imageUrl: "https://covers.openlibrary.org/b/id/8232001-L.jpg",
    description:
      "Children discover a magical world filled with adventure and myth.",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Adventure",
    imageUrl: "https://covers.openlibrary.org/b/id/8373223-L.jpg",
    description:
      "A shepherd’s journey to discover his personal legend and true destiny.",
  },
];

mongoose
  .connect('mongodb://localhost:27017/BookShop') // 🔁 Replace with your MongoDB URI if needed
  .then(() => {
    console.log('MongoDB connected. Seeding books...');
    return Book.insertMany(books);
  })
  .then(() => {
    console.log('Books added successfully!');
    return mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Error seeding books:', err);
  });