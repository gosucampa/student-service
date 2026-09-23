import * as repo from '../repository/studentRepository.js';

export const addStudent = async student => repo.createStudent(student);

export const findStudent = async id => {
  let student = repo.findStudentById(+id);
  if (student) {
    student = {...student};
    student.password = undefined;
  }
  return student;

}

export const deleteStudent = async id => {
  let student = repo.deleteStudent(+id);
  if (student) {
    student = {...student};
    student.password = undefined;
  }
  return student;
}

export const updateStudent = async (id, data) => {
  let student = repo.updateStudent(+id, data);
  if (student) {
    student = {...student};
    student.password = undefined;
  }
  return student;
}

export const addScore = async (id, exam, score) => repo.addScore(+id, exam, score);

export const findStudentsByName = async name => {
  return repo.findStudentsByName(name).map(s => {
    const student = {...s};
    student.password = undefined;
    return student;
  })
}

export const countStudentsByNames = async names => {
  if(!names) return 0;
  const nameArray = Array.isArray(names) ? names : [names];
  return repo.getAllStudents().filter(s => nameArray.includes(s.name)).length;
}

export const findStudentsByMinScore = async (exam, minScore) => {
  return repo.findStudentsByMinScore(exam, minScore).map(s => {
    const student = {...s};
    student.password = undefined;
    return student;
  })
}