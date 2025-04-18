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
  REDIS: {},
  UPLOADFILE: {
    UPLOAD_DIR: 'public/uploads/',
    UPLOAD_TEMP: 'public/uploads/temp/',
    MAXSIZE: 1024 * 1024 * 1024, // 1G
    MAXCOUNT: 5,
    TYPE: ['image/png', 'image/jpeg', 'application/pdf', 'application/zip'],
    NO_TYPE_CHECK: false, // true:校验文件类型 false:不校验文件类型
  },
  SDSERVER: {
    HOST: 'http://ai.xn--4gqz0ap8cowd.top:7860',
  },
  STORAGE_DIR: 'public/storage',
  STORAGE_MAX_AGE: 1000 * 60 * 60 * 24 * 30, // 30 days
}

export default CONFIG
