module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@native-base/icons': '@native-base/icons/lib',
            'clixpesa/app': './app',
            'clixpesa/blockchain': './blockchain',
            'clixpesa/components': './components',
            'clixpesa/features': './features',
            'clixpesa/utils': './utils',
          },
        },
      ],
    ],
  }
}
