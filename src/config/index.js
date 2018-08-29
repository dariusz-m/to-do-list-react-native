/* eslint-disable no-undef */
import devConfig from './config.development';
import testConfig from './config.test';

const env = process.env.NODE_ENV || 'development';

const config = {
    development: devConfig,
    test: testConfig,
};

export default config[env];
