import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json'
import pkg from './package.json';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

const name = 'AdventureBuddy';

export default {
  input: './src/index.ts',

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external: [],

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),
    json(),
    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'] }),
  ],

  output: [
    {
        file: pkg.browser,
        format: 'iife',
        name,
        sourcemap: true,
        globals: {},
    }
  ],
  watch: {
    include: 'src/**/*'
  }
};