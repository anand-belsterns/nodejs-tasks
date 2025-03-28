module.exports = {
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\.|/)(test|spec))\.jsx?$',
  transform: {
    '^.+\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};