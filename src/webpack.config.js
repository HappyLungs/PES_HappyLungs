const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  // Customize the config before returning it.
  return await createExpoWebpackConfigAsync(env, argv);
};
