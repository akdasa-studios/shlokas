module.exports = {
  // 'check-coverage': false,
  // 'per-file': true,
  // 'skip-full': true,
  // all: true,
  include: ['*'],
  // exclude: [
  //   'src/*.js',
  //   '**/index.js',
  //   'src/plugins/*',
  // ],
  reporter: ['lcov', 'text', 'text-summary'],
  extension: ['.js', '.ts'],
}