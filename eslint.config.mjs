import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import reactPlugin from "eslint-plugin-react";
import tsParser from "@typescript-eslint/parser";
import stylisticTs from "@stylistic/eslint-plugin-ts";

const project = "./tsconfig.json";

/** @type {import("eslint").Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  importPlugin.flatConfigs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  {
    files: ["*.tsx"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off"
    }
  },
  {
    files: ["*.ts"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "warn"
    }
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "unused-imports": unusedImports,
      "@stylistic/ts": stylisticTs
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    languageOptions: {
      globals: {
        __IS_DEV__: true,
        __API__: true,
        ...globals.browser
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        },
        project,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      //TODO починить ошибку import/no-unresolved для путей с алиасом @/
      "import/no-unresolved": "off",
      "no-unused-vars": "warn",
      indent: ["error", 4],
      "@stylistic/ts/indent": ["error", 4],
      "@stylistic/ts/member-delimiter-style": [
        "error",
        {
          multiline: { delimiter: "semi", requireLast: true }
        }
      ],
      "max-len": [
        "warn",
        {
          code: 150,
          ignoreComments: true
        }
      ],
      "react/jsx-indent": [2, 4],
      "react/jsx-indent-props": [2, 4],
      "react/jsx-filename-extension": [
        2,
        {
          extensions: [".js", ".jsx", ".tsx"]
        }
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling"
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before"
            },
            {
              pattern: "@/**",
              group: "external",
              position: "after"
            }
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "never",
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ],
      "import/extensions": "off",
      "unused-imports/no-unused-imports": "error",
      "@stylistic/ts/comma-dangle": [
        "error", {
          arrays: "always",
          objects: "always",
          imports: "always",
          exports: "always",
          functions: "never"
        }
      ],
      "@stylistic/ts/strict-boolean-expressions": "off",
      "@stylistic/ts/promise-function-async": "off",
      "@stylistic/ts/return-await": "off",
      "react/display-name": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-explicit-any": "warn"
    }
  }
];