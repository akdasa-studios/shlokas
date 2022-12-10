module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transformIgnorePatterns: ['/node_modules/(?!@ionic/vue|@ionic/vue-router|@ionic/core|@stencil/core|ionicons)'],
  testPathIgnorePatterns: [
    "/node_modules/",
  ],
  reporters: [
    'default',
    [
      "./node_modules/jest-html-reporter", {
        "pageTitle": "Test Report",
        "outputPath": "./unit-report/report.html"
      }
    ]
  ],
  testMatch: [
    '<rootDir>/tests/components/**/*.spec.ts',
    '<rootDir>/tests/unit/**/*.spec.ts'
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
}
