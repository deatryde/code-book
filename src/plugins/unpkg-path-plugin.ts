import type { Plugin, PluginBuild } from 'esbuild-wasm';

export const unpkgPathPlugin = (): Plugin => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: PluginBuild) {
      build.onResolve({ filter: /.*/ }, async args => {
        console.log('onResole', args);
        return { path: args.path, namespace: 'a' };
      });

      build.onLoad({ filter: /.*/ }, async args => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import message from './message';
              console.log(message);
            `,
          };
        } else {
          return {
            loader: 'jsx',
            contents: 'export default "hi there!"',
          };
        }
      });
    },
  };
};
