const mongoose = require("mongoose");
const User = require("../models/users");

const email = process.argv[2]?.trim().toLowerCase();
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/BookShop";

if (!email) {
  console.error("Usage: node scripts/promote-admin.js <email>");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(async () => {
    const user = await User.findOneAndUpdate({ email }, { role: "admin" }, { new: true });
    if (!user) {
      throw new Error(`No user found with email: ${email}`);
    }
    console.log(`${user.email} is now an administrator.`);
  })
  .catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
