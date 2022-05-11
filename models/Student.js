import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Courses" },
});

export default mongoose.model("Student", studentSchema);

//name roll-no class courseId(FK)
