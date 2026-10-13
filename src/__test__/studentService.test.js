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
    const student = {
      id: 2,
      name: 'John',
      password: 'secret'
    };
    mockRepo.findStudentById.mockResolvedValue(student);
    const result = await studentService.findStudent(1);
    expect(result).toEqual(student);
    expect(mockRepo.findStudentById).toHaveBeenCalledWith(1);
  });
  it('deleteStudent converts id to a number and returns the deleted student', async () => {
    const student = {
      id: 2,
      name: 'John',
      password: 'secret'
    };
    mockRepo.deleteStudent.mockResolvedValue(student);
    const result = await studentService.deleteStudent(3);
    expect(result).toEqual(student);
    expect(mockRepo.deleteStudent).toHaveBeenCalledWith(3);
  });
  it('updateStudent return update student without scores', async () => {
    const toObject = jest.fn().mockReturnValue({
      id: 3,
      name: 'John',
      password: 'secret'
    });
    mockRepo.updateStudent.mockResolvedValue({toObject});
    const result = await studentService.updateStudent(3, {name: 'John'});
    expect(result).toEqual({
      id: 3,
      name: 'John',
      password: 'secret'
    });
    expect(toObject).toHaveBeenCalled();
    });
  it('updateStudent return undefined when student does not exists', async () => {
    mockRepo.updateStudent.mockResolvedValue(null);
    const result = await studentService.updateStudent(3, {name: 'John'});
    expect(result).toBeUndefined();
  });
  it('addScore delegates to repository', async () => {
    const update = {id:1}
    mockRepo.updateStudent.mockResolvedValue(update);
    const result = await studentService.addScore(1, 'Math', 95);
    expect(result).toEqual(update);
    expect(mockRepo.updateStudent).toHaveBeenCalledWith(1, {'scores.Math': 95});
  });
  it('findStudentsByName delegates to repository', async () => {
    const list = [{id: 1, name: 'Eva'}];
    mockRepo.findStudentsByName.mockResolvedValue(list);
    const result = await studentService.findStudentsByName('Eva');
    expect(result).toEqual(list);
    expect(mockRepo.findStudentsByName).toHaveBeenCalledWith('Eva');
  });
  it('countStudentsByNames delegate to repository', async () => {
    mockRepo.countStudentsByNames.mockResolvedValue(2);
    const result = await studentService.countStudentsByNames(['John', 'Mary']);
    // Assert
    expect(result).toBe(2);
    expect(mockRepo.countStudentsByNames).toHaveBeenCalledWith(['John', 'Mary']);
  });
  it('countStudentsByNames delegate to repository', async () => {
    mockRepo.countStudentsByNames.mockResolvedValue(1);
    const result = await studentService.countStudentsByNames('John');
    expect(result).toBe(1);
    expect(mockRepo.countStudentsByNames).toHaveBeenCalledWith(['John']);
  });
  it('findStudentsByMinScore delegate to repository', async () => {
    const list = [{id: 1, scores: {Math: 90}}];
    mockRepo.findStudentsByMinScore.mockResolvedValue(list);
    const result = await studentService.findStudentsByMinScore('Math', '80');
    expect(result).toEqual(list);
    expect(mockRepo.findStudentsByMinScore).toHaveBeenCalledWith('Math', 80);
  });
});