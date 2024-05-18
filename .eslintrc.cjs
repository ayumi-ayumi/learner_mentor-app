module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    "plugin:@typescript-eslint/recommended",
    'plugin:react/recommended',
    // 'plugin:react-hooks/recommended',
    "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // TypeScript用設定を追加
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  settings: { react: { version: '18.2' } },
  plugins: ["@typescript-eslint", 'react'],
  parser: "@typescript-eslint/parser",
  rules: {
    "react/react-in-jsx-scope": "off",
  },
  "overrides": [
    {
        "env": {
            "node": true
        },
        "files": [
            ".eslintrc.{js,cjs}"
        ],
        "parserOptions": {
            "sourceType": "script"
        }
    }
],
}
