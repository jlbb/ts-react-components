const merge = require('webpack-merge');

const baseConfig = require('./conf/webpack.config.base');
const modeConfig = mode => require(`./conf/webpack.config.${mode}.js`);

const DEV = 'development';
const PROD = 'production';

module.exports = (env = { NODE_ENV: '' }) => {
    const mode = env.NODE_ENV === PROD ? PROD : DEV;
    return merge(baseConfig, modeConfig(mode));
};
