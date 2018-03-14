module.exports = {
  coveragePathIgnorePatterns: [
    '<rootDir>/client/__tests__/*',
    '<rootDir>/server/*'
  ],
  testMatch: [
    '**/?(*.)(test).js?(x)'
  ],
  // collectCoverage: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/client/__tests__/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/client/__tests__/__mocks__/styleMock.js'
  },
  testPathIgnorePatterns: [
    '<rootDir>./server/__test__/*.js'
  ],
  // collectCoverageFrom: [
  //   '**/client/**.{js,jsx}',
  //   '!**/node_modules/**'
  // ],
  globals: {
    toastr: {
      info: (() => {}),
      success: (() => {}),
      error: (() => {}),
      warning: (() => {})
    },
    localStorage: {
      setItem: (() => {}),
      clearItem: (() => {}),
      getItem: (() => {}),
      removeItem: (() => {})
    },
  },
};
