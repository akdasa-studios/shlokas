module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    "plugin:vue/vue3-strongly-recommended",
    "plugin:vue/vue3-recommended",
    'eslint:recommended',
    'plugin:import/recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  settings: {
    'import/resolver': {
      'typescript': true,
      'node': true,
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-deprecated-slot-attribute': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "import/order": [
      "error",
      {
        groups: [
          "builtin", "external", "internal", "parent", "sibling", "index", "object"
        ]
      }
    ],
    "semi": ["error", "never"]
  },
  ignorePatterns: ["dist/**"],
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}