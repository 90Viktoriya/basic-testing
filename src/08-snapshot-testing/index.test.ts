// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const values = ['value1', 'value2'];
    expect(generateLinkedList(values)).toStrictEqual({
      value: 'value1',
      next: { value: 'value2', next: { value: null, next: null } },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = ['value1', 'value2'];
    expect(generateLinkedList(values)).toMatchSnapshot();
  });
});
