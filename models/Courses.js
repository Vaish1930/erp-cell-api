import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  branch: { type: String, required: true },
  duration: { type: String, required: true },
});

export default mongoose.model("Courses", coursesSchema);
