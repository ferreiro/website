module.exports = function (api) {
    api.cache(true)
  
    const presets = [
        [ '@babel/env', { 'targets': { 'node': 'current' } } ],
        '@babel/preset-react'
    ]

    const plugins = [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties'
    ]
  
    return { 
        ignore: [/node_modules/],
        presets,
        plugins
    }
}