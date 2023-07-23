module.exports = {
  root: true,

  env: {
    es2021: true,
    browser: true,
    node: true,
  },

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    Vue: true,
    Vuex: true,
    axios: true,
    route: true,
    process: true,
    require: true,
    CONSTANTS: true,
    ASSETS: true,
    publicPath: true,
    describe: true,
    it: true,
    expect: true,
    beforeEach: true,
    beforeAll: true,
  },

  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },

  extends: ['plugin:vue/essential', 'airbnb-base'],
  rules: {
    'import/prefer-default-export': 'off',
    'vue/no-unused-vars': 'off',
    'no-tabs': 'off',
    'vue/multi-word-component-names': 0,
    'no-param-reassign': 'off',
  },
  settings: {
    'import/resolver': false,
  },
};
