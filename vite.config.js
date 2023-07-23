/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import path from 'node:path';
import { defineConfig } from 'vite';
import createVuePlugin from '@vitejs/plugin-vue2';
import Components from 'unplugin-vue-components/vite';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import viteRequireContext from '@originjs/vite-plugin-require-context';

import EnvironmentPlugin from 'vite-plugin-environment';
import { visualizer } from 'rollup-plugin-visualizer';
import progress from 'vite-plugin-progress';
import eslintPlugin from 'vite-plugin-eslint';

const config = defineConfig({
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.scss'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, '@/assets/'),
      '@store': path.resolve(__dirname, './src/store/'),
      '@router': path.resolve(__dirname, './src/router/'),
      '@plugins': path.resolve(__dirname, './src/app/plugins/'),
      '@modules': path.resolve(__dirname, './src/app/modules/'),
      '@components': path.resolve(__dirname, './src/app/components/'),
      '@skeletons': path.resolve(__dirname, './src/app/skeletons/'),
    },
  },

  build: {
    minify: true,
    sourcemap: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split external library from transpiled code.
          vue: ['vue', 'vue-router', 'vuex'],
          vuetify: ['vuetify/lib', 'vuetify/src'],
          lodash: ['lodash', 'lodash-es'],
        },
      },
    },
  },

  plugins: [
    createVuePlugin({ template: { compilerOptions: { whitespace: 'preserve' } } }),
    Components({
      resolvers: [VuetifyResolver()], // resolve vuetify
    }),
    viteCommonjs(), // enable compatibilities with commonjs or UMD codes
    viteRequireContext(), // support require.context

    visualizer({ gzipSize: true }), // bundle report generator
    progress(),

    EnvironmentPlugin('all'),
    eslintPlugin(),
  ],

  server: {
    port: 8000,
  },
});

export default config;
