import express from "express";
import cors from "cors";
import connectDb from "./db.js";
import coursesRouter from "./routes/courses.js";
import studentRouter from "./routes/student.js";

const app = express();

app.use(express.json());
app.use(cors());

await connectDb();

app.get("/", (req, res) => res.json("Welcome to erp-cell"));
app.use("/api", coursesRouter);
app.use("/api", studentRouter);

app.listen(80, () => console.log("Listening on localhost:80"));
