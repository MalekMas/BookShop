const mongoose = require('mongoose');
const Book = require('./models/book'); // adjust the path if needed

const books = [
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Classic",
    category: "Fiction",
    rating: 4.5,
    publisher: "Penguin Classics",
    publishedDate: new Date("1813-01-28"),
    isbn: "9780141439518",
    description: "A timeless romantic novel about manners, marriage, and society.",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81OthjkJBuL.jpg"
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Science Fiction",
    category: "Fiction",
    rating: 4.7,
    publisher: "Ballantine Books",
    publishedDate: new Date("2021-05-04"),
    isbn: "9780593135204",
    description: "A lone astronaut fights to save Earth in this epic sci‑fi adventure.",
    imageUrl: "https://m.media-amazon.com/images/I/71gk0vRM8cL.jpg"
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    category: "Fiction",
    rating: 4.7,
    publisher: "Signet Classics",
    publishedDate: new Date("1949-06-08"),
    isbn: "9780451524935",
    description: "A chilling tale of totalitarianism and surveillance.",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    category: "Fiction",
    rating: 4.2,
    publisher: "Scribner",
    publishedDate: new Date("1925-04-10"),
    isbn: "9780743273565",
    description: "A portrait of the Jazz Age and the elusive American Dream.",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    category: "Fiction",
    rating: 4.7,
    publisher: "Mariner Books",
    publishedDate: new Date("1937-09-21"),
    isbn: "9780547928227",
    description: "Bilbo’s epic journey through Middle‑Earth.",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg"
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    genre: "History",
    category: "Non-Fiction",
    rating: 4.7,
    publisher: "Harper",
    publishedDate: new Date("2015-02-10"),
    isbn: "9780062316097",
    description: "An exploration of human history and evolution.",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg"
  },
  {
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    category: "Non-Fiction",
    rating: 4.7,
    publisher: "Random House",
    publishedDate: new Date("2018-02-20"),
    isbn: "9780399590504",
    description: "A memoir of family and self‑discovery through education.",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81WojUxbbFL.jpg"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Adventure",
    category: "Fiction",
    rating: 4.6,
    publisher: "HarperOne",
    publishedDate: new Date("1993-05-01"),
    isbn: "9780061122415",
    description: "A shepherd’s journey to find his personal legend.",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg"
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    category: "Fiction",
    rating: 4.2,
    publisher: "Harper Perennial",
    publishedDate: new Date("1932-08-30"),
    isbn: "9780060850524",
    description: "A statistic vision of a genetically controlled future society.",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81z4FcS3lPL.jpg"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Classic",
    category: "Fiction",
    rating: 4.0,
    publisher: "Little, Brown",
    publishedDate: new Date("1951-07-16"),
    isbn: "9780316769488",
    description: "Holden Caulfield’s cynical teenage adventures in NYC.",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81Othjk-x7L.jpg"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
    genre: "Science Fiction",
    category: "Fiction",
    rating: 4.5,
    publisher: "Ballantine Books",
    publishedDate: new Date("1990-09-20"),
    isbn: "9780345538987",
    description: "Genetically resurrected dinosaurs run amok in a futuristic park.",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51Fv+YC8tyL.jpg"
  },
  {
    title: "Everything Is Illuminated",
    author: "Jonathan Safran Foer",
    genre: "Literary Fiction",
    category: "Fiction",
    rating: 4.1,
    publisher: "Little, Brown",
    publishedDate: new Date("2002-04-30"),
    isbn: "9780316921891",
    description: "A young man travels to Eastern Europe to uncover his family history.",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71yNa6AD1CL.jpg"
  }
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