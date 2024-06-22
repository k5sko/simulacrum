import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import autoprefixer from 'autoprefixer';
import path from 'path';

const packageJson = require('./package.json');

export default [
  {
    input: path.resolve(__dirname, 'src/index.ts'),
    external: ['react', 'react-dom'],
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: false,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: false,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: path.resolve(__dirname, './tsconfig.json') }),
      postcss({
        plugins: [autoprefixer()],
      }),
    ],
  },
  {
    input: path.resolve(__dirname, 'dist/esm/index.d.ts'),
    output: [{ file: path.resolve(__dirname, 'dist/index.d.ts'), format: 'esm' }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];
