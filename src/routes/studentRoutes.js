import { Router } from "express";
import {
  addStudent,
  deleteStudent,
  findStudent,
  updateStudent,
  addScore,
  findStudentsByName,
  countStudentsByName,
  findStudentsByMinScore
} from "../controller/studentController.js";

const router = Router();

router.post('/student', addStudent);
router.get('/student/:id', findStudent);
router.delete('/student/:id', deleteStudent);
router.put('/student/:id', updateStudent);
router.put('/score/student/:id', addScore);

router.get('/students/name/:name', findStudentsByName);
router.get('/quantity/students', countStudentsByName);
router.get('/students/exam/:exam/minscore/:minScore', findStudentsByMinScore);


export default router;