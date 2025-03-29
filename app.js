import express from "express";
import userRouter from "./routes/userRouter.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);

app.set("view engine", "ejs");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
