import Student from '../model/student.js';

const students = new Map();

export const createStudent = ({id, name, password}) => {
 if(students.has(id)) {
   return false;
 }
 students.set(id, new Student(id, name, password));
 return true;
}

export const findStudentById = id => students.get(id);

export const deleteStudent = id => {
  const student = students.get(id);
  students.delete(id);
  return student;
}

export const updateStudent = (id, {name, password}) => {
  const student = students.get(id);
  if(student) {
    if(name) student.name = name;
    if(password) student.password = password;
  }
  return student;
}

export const addScore = (id, exam, score) => {
  const student = students.get(id);
  if(!student) return false;
  student.scores = student.scores || {};
  student.scores[exam] = score;
  return true;
}

export const findStudentsByName = name =>
  [...students.values()].filter(s => s.name === name);

export const getAllStudents = () => [...students.values()];

export const findStudentsByMinScore = (exam, minScore) =>
  [...students.values()].filter(s =>s.scores && s.scores[exam] >= minScore);

