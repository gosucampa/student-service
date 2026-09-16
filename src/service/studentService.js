
const students = [];

export const addStudent = async student => {
  const index = students.findIndex(s => s.id === +student.id);
  if (index !== -1) {
    return false;
  }
  students.push({
    ...student,
    scores: student.scores || {}
  });
  return true;
};

export const findStudent = async id => {
  const student = students.find(s => s.id === +id);
  return student || null
};

export const deleteStudent = async id => {
  const index = students.findIndex(s => s.id === +id);
  if (index === -1) {
    return null;
  }
  const [deleted] = students.splice(index, 1);
  return deleted;
};

export const updateStudent = async (id, data) => {
  const student = students.find(s => s.id === +id);
  if (!student) {
    return null;
  }
  if (data.name) {
    student.name = data.name;
  }
  return student;
};

export const addScore = async (id,exam, score) => {
  const student = students.find(s => s.id === +id);
  if(!student) {
    return false;
  }
  if(!student.scores) {
    student.scores = {};
  }
  student.scores[exam] = +score;
  return true;
};

export const findStudentsByName = async name => {
  return students.filter(s => s.name?.toLowerCase() === (name.toLowerCase()));
};

export const countStudentsByName = async name => {
  const names = Array.isArray(name) ? name : [name];
  return students.filter(s => names.includes(s.name)).length;
};

export const findStudentsByMinScore = async (exam, minScore) => {
  return students.filter(s => s.scores && s.scores[exam] >= +minScore);
};