const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// zustand's ESM build (esm/middleware.mjs) uses import.meta.env which is
// invalid syntax in a non-module script. Force the CJS build on web.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'zustand/middleware' && platform === 'web') {
    return {
      filePath: require.resolve('zustand/middleware'),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
