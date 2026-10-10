/*
The Arrange, Act, Assert (AAA) pattern in TDD unit testing involves three steps:
Arrange (Setting up the test environment),
Act (executing the code under test),
and Assert (verifying the expected outcome).
This pattern helps in writing clear, maintainable, and predictable test cases.
 */

import {jest, beforeEach, describe, it, expect} from '@jest/globals';

const mockRepo = {
  createStudent: jest.fn(),
  findStudentById: jest.fn(),
  deleteStudent: jest.fn(),
  updateStudent: jest.fn(),
  findStudentsByName: jest.fn(),
  countStudentsByNames: jest.fn(),
  findStudentsByMinScore: jest.fn()
}

jest.unstable_mockModule('../repository/studentRepository.js', () => mockRepo);

const studentService = await import('../service/studentService.js');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Student Service', () => {
  it('addStudent returns false when student already exists', async () => {
    // Arrange
    mockRepo.findStudentById.mockResolvedValue({id: 1});
    // Act
    const result = await studentService.addStudent({
      id: 1,
      name: 'John',
      password: 'secret'
    })
    // Assert
    expect(result).toBeFalsy();
    expect(mockRepo.createStudent).not.toHaveBeenCalled();
    expect(mockRepo.findStudentById).toHaveBeenCalledWith(1);
  })
  it('addStudent returns true when student does not exist', async () => {
    // Arrange
    mockRepo.findStudentById.mockResolvedValue(null);
    // Act
    const result = await studentService.addStudent({
      id: 2,
      name: 'John',
      password: 'secret'
    })
    // Assert
    expect(result).toBeTruthy();
    expect(mockRepo.createStudent).toHaveBeenCalledWith({
      _id: 2,
      name: 'John',
      password: 'secret'
    });
    expect(mockRepo.findStudentById).toHaveBeenCalledWith(2);
  })
  it('findStudent converts id to a number and returns the student', async () => {
    // Arrange
    const student = {id: 2, name: 'John'};
    mockRepo.findStudentById.mockResolvedValue(student);
    // Act
    const result = await studentService.findStudent('2');
    // Assert
    expect(result).toEqual(student);
    expect(mockRepo.findStudentById).toHaveBeenCalledWith(2);
  });
  it('deleteStudent converts id to a number and returns the deleted student', async () => {
    // Arrange
    const student = {id: 2, name: 'John'};
    mockRepo.deleteStudent.mockResolvedValue(student);
    // Act
    const result = await studentService.deleteStudent('2');
    // Assert
    expect(result).toEqual(student);
    expect(mockRepo.deleteStudent).toHaveBeenCalledWith(2);
  });
  it('updateStudent converts id to a number and passes the updated student data', async () => {
    // Arrange
    const data = {name: 'Ann'};
    const student = {_id: 2, name: 'Ann'};
    mockRepo.updateStudent.mockResolvedValue(student);
    // Act
    const result = await studentService.updateStudent('2', data);
    // Assert
    expect(result).toEqual(student);
    expect(mockRepo.updateStudent).toHaveBeenCalledWith(2, data);
  });
  it('addScore updates the student score', async () => {
    // Arrange
    const student = {_id: 2, scores: {math: 90}};
    mockRepo.updateStudent.mockResolvedValue(student);
    // Act
    const result = await studentService.addScore('2', 'math', 90);
    // Assert
    expect(result).toEqual(student);
    expect(mockRepo.updateStudent).toHaveBeenCalledWith(2, {'scores.math': 90});
  });
  it('findStudentsByName passes the name to the repository', async () => {
    // Arrange
    const student = [{_id: 2, name: 'John'}];
    mockRepo.findStudentsByName.mockResolvedValue(student);
    // Act
    const result = await studentService.findStudentsByName('John');
    // Assert
    expect(result).toEqual(student);
    expect(mockRepo.findStudentsByName).toHaveBeenCalledWith('John');
  });
  it('countStudentsByNames passes an array of names to the repository', async () => {
    // Arrange
    mockRepo.countStudentsByNames.mockResolvedValue(2);
    // Act
    const result = await studentService.countStudentsByNames(['John', 'Mary']);
    // Assert
    expect(result).toBe(2);
    expect(mockRepo.countStudentsByNames).toHaveBeenCalledWith(['John', 'Mary']);
  });
  it('countStudentsByNames wraps a single name in an array', async () => {
    // Arrange
    mockRepo.countStudentsByNames.mockResolvedValue(1);
    // Act
    const result = await studentService.countStudentsByNames('John');
    // Assert
    expect(result).toBe(1);
    expect(mockRepo.countStudentsByNames).toHaveBeenCalledWith(['John']);
  });
  it('findStudentsByMinScore converts minScore to a number', async () => {
    // Arrange
    const students = [{_id: 1, name: 'John'}];
    mockRepo.findStudentsByMinScore.mockResolvedValue(students);
    // Act
    const result = await studentService.findStudentsByMinScore('math', '80');
    // Assert
    expect(result).toEqual(students);
    expect(mockRepo.findStudentsByMinScore).toHaveBeenCalledWith('math', 80);
  });
});