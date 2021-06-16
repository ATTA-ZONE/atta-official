{
  "root": true,
  "env": {
      "node": true
  },
  "extends": ["plugin:vue/vue3-essential", "@vue/standard"],
  "parserOptions": {
    "parser": 'babel-eslint',
    "ecmaVersion": 6
  },
  "rules": {
    "arrow-parens": 0,
    "generator-star-spacing": 0,
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "semi": [
        "error",
        "always"
    ],
    "indent": [
        "error",
        4
    ],
    "space-before-function-paren": 0,
    "eol-last": 0,
    "no-useless-escape": "off",
    "max-len": [
        2,
        200,
        4,
        {
            "ignoreUrls": true
        }
    ],
    "prefer-const": [
        "error",
        {
            "destructuring": "all",
            "ignoreReadBeforeAssign": false
        }
    ],
    "guard-for-in": "error"
  }
}