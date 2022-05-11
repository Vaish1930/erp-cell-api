import { Router } from "express";
import Courses from "../models/Courses.js";

const router = Router();

router.post("/courses/create", async (req, res) => {
  try {
    const { courseName, branch } = req.body;
    // const doesCourseExist = await Courses.findOne({ courseName });
    const doesBranchExists = await Courses.findOne({ branch });

    // if (doesCourseExist)
    //   return res.status(400).json(`Course ${courseName} already exists`);

    if (doesBranchExists && doesBranchExists.courseName === courseName)
      return res.status(400).json(`Branch already exists`);

    const course = new Courses(req.body);
    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(500).json(`Something went wrong : ${error}`);
  }
});

router.get("/courses", async (req, res) => {
  try {
    const courses = await Courses.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`);
  }
});

router.patch("/courses/update/:id", async (req, res) => {
  try {
    const course = await Courses.findById(req.params.id);

    if (!course) return res.status(404).json(`Course not found `);

    const updatedCourse = await Courses.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCourse);
  } catch (error) {}
});

router.delete("/courses/delete/:id", async (req, res) => {
  try {
    // const {courseName , branch , duration} = req.body;
    // const deleteCourse = await Courses.findById(req.params.id);

    const deletedCourse = await Courses.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(deletedCourse);
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`);
  }
});

export default router;
