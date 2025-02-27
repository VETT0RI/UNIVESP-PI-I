import globals from "globals"
import pluginJs from "@eslint/js"

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    env: {
      browser: true,
      node: true,
    },
    languageOptions: {
      // Se estiver lintando arquivos JS e TS, especifique os globals
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    // Adiciona uma configuração específica para arquivos TS
    overrides: [
      {
        files: ["**/*.ts", "**/*.tsx"],
        parser: "@typescript-eslint/parser",
        plugins: ["@typescript-eslint"],
        extends: ["plugin:@typescript-eslint/recommended"],
      },
    ],
  },
  pluginJs.configs.recommended,
]
