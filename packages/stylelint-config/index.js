module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-sass-guidelines",
    "stylelint-config-recess-order",
    "stylelint-config-prettier",
  ],
  rules: {
    "selector-no-qualifying-type": [
      true,
      {
        ignore: ["attribute", "class", "id"],
      },
    ],
    "selector-max-compound-selectors": 5,
    "selector-type-no-unknown": [
      true,
      {
        ignoreTypes: ["/^taro-/", "page"],
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["host", "global"],
      },
    ],
    "selector-class-pattern": [
      "^[a-z]([a-z0-9-]+)?((__|_)([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$",
      {
        resolveNestedSelectors: true,
      },
    ],
    "max-nesting-depth": [
      5,
      {
        ignoreAtRules: ["each", "media", "supports", "include"],
      },
    ],
  },
}
