// eslint.config.mjs
import next from "eslint-config-next";

export default [
  ...next,
  {
    rules: {
      // stop failing the build on 'any'
      "@typescript-eslint/no-explicit-any": "off",
      // optional: keep unused vars as warnings, ignore leading-underscore args
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
];
