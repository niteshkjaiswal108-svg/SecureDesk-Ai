// eslint.config.js
import { Linter } from "eslint";

const config = /** @type {Linter.Config} */ ({
  root: true, // don't look for configs in parent folders
  parser: "@typescript-eslint/parser", // for TypeScript
  parserOptions: {
    ecmaVersion: 2023, // modern JS features
    sourceType: "module", // ES Modules
    ecmaFeatures: {
      jsx: true, // if using React
    },
  },
  env: {
    browser: true, // for front-end
    node: true,    // for back-end
    es2023: true,
  },
  plugins: ["@typescript-eslint", "import", "prettier"], // production plugins
  extends: [
    "eslint:recommended",            // basic ESLint recommended rules
    "plugin:@typescript-eslint/recommended", // TS rules
    "plugin:import/errors",           // import/export checks
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",                       // integrates Prettier to avoid conflicts
  ],
  rules: {
    // possible errors
    "no-console": "warn", // warn instead of error
    "no-debugger": "error",

    // best practices
    "eqeqeq": ["error", "always"],
    "curly": ["error", "all"],
    "no-unused-vars": "off", // handled by TS
    "@typescript-eslint/no-unused-vars": ["warn"],

    // stylistic
    "semi": ["error", "always"],
    "quotes": ["error", "double", { avoidEscape: true }],
    "indent": ["error", 2],
    "comma-dangle": ["error", "always-multiline"],

    // import order
    "import/order": [
      "error",
      {
        groups: [["builtin", "external"], "internal", ["parent", "sibling", "index"]],
        "newlines-between": "always",
      },
    ],

    // Prettier formatting
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        semi: true,
        trailingComma: "all",
        endOfLine: "auto",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".jsx", ".tsx"],
      },
    },
  },
});

export default config;