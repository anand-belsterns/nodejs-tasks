const greet = require('../src/index');
test('greet message', () => {
  expect(greet).toBe('Hello World!');
});