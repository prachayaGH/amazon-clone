const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname, {
  // เปิดใช้ require.context
  isCSSEnabled: true,
});

config.transformer.unstable_allowRequireContext = true;

module.exports = config;