import { Router } from "express";
import Student from "../models/Student.js";

const router = Router();

router.post("/students/enroll", async (req, res) => {
  try {
    const { rollNumber } = req.body;
    const doesStudentExists = await Student.findOne({ rollNumber });

    if (doesStudentExists)
      return res.status(400).json(`Already enrolled in some course`);

    const student = new Student(req.body);
    const createdStudent = await student.save();
    res.status(201).json(createdStudent);
  } catch (error) {
    res.status(500).json(`Something went wrong : ${error} `);
  }
});

router.get("/students", async (req, res) => {
  try {
    const { courseId } = req.body;
    const students = await Student.find({ courseId }).populate(
      "courseId",
      "-__v"
    );

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`);
  }
});

router.patch("/students/update/:id", async (req, res) => {
  try {
    const { name, courseId } = req.body;

    const student = await Student.findById(req.params.id);

    if (!student) return res.status(404).json(`Student not found`);

    if (name) student.name = name;
    if (courseId) student.courseId = courseId;

    const updatedStudent = await student.save();
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`);
  }
});

router.delete("/students/delete/:id", async (req, res) => {
  try {
    // const { rollNumber } = req.body;

    const student = await Student.findById(req.params.id);

    if (!student) return res.status(404).json(`Student not found`);

    const deletedStudent = await Student.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(deletedStudent);
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`);
  }
});

export default router;
