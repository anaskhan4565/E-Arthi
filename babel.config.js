module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: false
    }]
  ]
};
// };
// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'], // Correct preset name
//   plugins: ['react-native-reanimated/plugin'], // Ensure this line is present
// };
