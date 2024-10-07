import antfu from '@antfu/eslint-config';

export default antfu({
  rules: {
    'indent': ['error', 2],
    'style/semi': ['error', 'always'],
    'antfu/if-newline': 'off',
    'antfu/consistent-list-newline': 'off',
    'no-unused-vars': 'off',
    'antfu/top-level-function': 'off',
  },

  ignores: ['node_modules', '*.d.ts', '.nuxt', '.output', '.gitlab-ci.yml', 'Dockerfile'],
});
