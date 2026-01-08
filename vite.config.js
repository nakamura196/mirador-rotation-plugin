import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';
import pkg from './package.json';

/**
* Vite configuration
*/
export default defineConfig({

  base: process.env.GITHUB_PAGES ? (process.env.BASE_PATH || '/mirador-rotation-plugin/') : '/',

  ...(

    process.env.GITHUB_PAGES ? {
      build: {
        emptyOutDir: true,
        outDir: 'dist',
        rollupOptions: {
          external: ['__tests__/*', '__mocks__/*'],
          input: fileURLToPath(new URL('./demo/src/index.html', import.meta.url)),
        },
        sourcemap: true,
      },
    }
      : {
        build: {
          lib: {
            entry: './src/index.js',
            fileName: (format) => (format === 'umd' ? 'mirador-rotation.js' : 'mirador-rotation.es.js'),
            formats: ['es', 'umd'],
            name: 'MiradorDlPlugin',
          },
          rollupOptions: {
            external: [...Object.keys(pkg.peerDependencies || {}), '__tests__/*', '__mocks__/*'],
            output: {
              assetFileNames: 'mirador-rotation.[ext]',
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
              },
            },
          },
          sourcemap: true,
        },
      }
  ),
  esbuild: {
    exclude: [],
    // Matches .js and .jsx in __tests__ and .jsx in src
    include: [/__tests__\/.*\.(js|jsx)$/, /src\/.*\.jsx?$/],
    loader: 'jsx',
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'load-js-files-as-jsx',
          // TODO: rename all our files to .jsx ...
          setup(build) {
            build.onLoad({ filter: /(src|__tests__)\/.*\.js$/ }, async (args) => ({
              contents: await fs.readFile(args.path, 'utf8'),
              loader: 'jsx',
            }));
          },
        },
      ],
    },
  },
  plugins: [
    react(),
    // カスタムプラグインを追加してディレクトリ構造を修正
    {
      closeBundle: async () => {
        if (process.env.GITHUB_PAGES) {
          const distDir = path.resolve('dist');
          const demoSrcDir = path.resolve(distDir, 'demo', 'src');

          // demo/src/ディレクトリが存在するか確認
          try {
            const demoSrcStats = await fs.stat(demoSrcDir);
            if (demoSrcStats.isDirectory()) {
              console.log('Moving files from demo/src to root directory...');

              // demo/src内のファイルリストを取得
              const files = await fs.readdir(demoSrcDir);

              // 各ファイルをルートディレクトリに移動（並列処理）
              const copyPromises = files.map(async (file) => {
                const srcPath = path.join(demoSrcDir, file);
                const destPath = path.join(distDir, file);
                const stats = await fs.stat(srcPath);
                if (stats.isFile()) {
                  await fs.copyFile(srcPath, destPath);
                  console.log(`Copied: ${srcPath} -> ${destPath}`);
                }
              });
              await Promise.all(copyPromises);

              console.log('Files moved successfully.');
            }
          } catch (err) {
            if (err.code !== 'ENOENT') {
              console.error('Error processing output files:', err);
            }
          }
        }
      },
      name: 'fix-output-structure',
    },
  ],
  resolve: {
    alias: {
      '@tests/': fileURLToPath(new URL('./__tests__', import.meta.url)),
    },
  },
  server: {
    open: '/demo/src/index.html',
    port: '4446',
  },
});
