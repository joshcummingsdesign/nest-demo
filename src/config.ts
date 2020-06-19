import * as Joi from '@hapi/joi';

export enum EConfigOptions {
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_USERNAME = 'DB_USERNAME',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_DATABASE = 'DB_DATABASE',
  CRYPTO_SALT_ROUNDS = 'CRYPTO_SALT_ROUNDS',
  JWT_EXPIRE_TIME = 'JWT_EXPIRE_TIME',
  JWT_PRIVATE_KEY = 'JWT_PRIVATE_KEY',
  JWT_PUBLIC_KEY = 'JWT_PUBLIC_KEY',
  AWS_ACCESS_KEY_ID = 'AWS_ACCESS_KEY_ID',
  AWS_SECRET_ACCESS_KEY = 'AWS_SECRET_ACCESS_KEY',
  AWS_SES_REGION = 'AWS_SES_REGION',
  AWS_SES_EMAIL = 'AWS_SES_EMAIL',
}

const configOptionsSchema: { [key in EConfigOptions]: any } = {
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  CRYPTO_SALT_ROUNDS: Joi.number().required(),
  JWT_EXPIRE_TIME: Joi.string().required(),
  JWT_PRIVATE_KEY: Joi.string().required(),
  JWT_PUBLIC_KEY: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_SES_REGION: Joi.string().required(),
  AWS_SES_EMAIL: Joi.string().required(),
};

export const validationSchema = Joi.object(configOptionsSchema).required();
