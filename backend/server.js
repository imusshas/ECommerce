import dotenv from "dotenv"
import { connectDB } from "./db/connectDB.js";
import { app } from "./app.js";

dotenv.config()


const PORT = process.env.PORT || 8000



connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    })

    app.on("error", (error) => {
      console.log("Something went wrong:", error);
    })
  })
  .catch((error) => {
    console.log("MongoDB connection failed!!!", error);
  })