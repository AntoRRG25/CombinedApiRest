module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["standard-with-typescript"],
  parserOptions: {
    project: "./tsconfig.eslint.json"
  },
  rules: {
    // Puedes agregar reglas personalizadas aquí si lo deseas
    // Por ejemplo:
    // 'semi': ['error', 'never'],
    // 'quotes': ['error', 'single']
  }
};
