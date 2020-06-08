import * as Joi from '@hapi/joi';

export enum EConfigOptions {
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_USERNAME = 'DB_USERNAME',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_DATABASE = 'DB_DATABASE',
  JWT_EXPIRE_TIME = 'JWT_EXPIRE_TIME',
  JWT_SECRET = 'JWT_SECRET',
}

export const validationSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  JWT_EXPIRE_TIME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
