module.exports = {
  extends: ["eslint:recommended", "prettier"],
  rules: {
    "no-var": "error",
    "prefer-const": "error",
    eqeqeq: "warn",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
};
