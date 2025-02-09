/**
 * app env config
 * You set the parameter set NODE_ENV=production at startup and load different environments
 * 1. package.json scripts add `"prod": "cross-env NODE_ENV=production nodemon",`
 * 2. here get env decided to use different data `const env = process.env.NODE_ENV`
 *
 * You can refer to `template-full`
 */
const CONFIG = {
  ENV: 'development',
  PORT: 3000,
  BASE_URL: 'http://127.0.0.1',
  PREFIX: '/api',
  SECRET: {
    JWT_KEY: 'zeffonwu',
    EXPIRES_IN: '1d',
  },
  DATABASE: {
    DIALECT: 'mysql',
    DB_NAME: 'db',
    HOST: '47.119.172.215',
    PORT: 3306,
    USER: 'dbtest',
    PASSWORD: '123456',
    TIMEZONE: '+08:00',
  },
  REDIS: {

  }
}

export default CONFIG
