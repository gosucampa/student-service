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
router.put('/student/:id/score', addScore);

router.get('/student/name/:name', findStudentsByName);
router.post('/student/name/:name/count', countStudentsByName);
router.get('/student/exam/:exam/minscore/:minScore', findStudentsByMinScore);


export default router;