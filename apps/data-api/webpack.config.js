const { composePlugins, withNx } = require('@nx/webpack');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`

  // Add a fallback for the 'path' module
  config.resolve = {
    ...config.resolve,
    fallback: {
      ...config.resolve.fallback,
      path: false,
    },
  };

  return config;
});
