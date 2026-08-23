import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .required()
    .valid('development', 'production', 'testing'),
  SERVER_PORT: Joi.number().required().port(),
  JWT_ACCESS_SECRET_KEY: Joi.string().required().length(64), // 256 bits
  JWT_ACCESS_EXPIRES: Joi.number().required(),
  JWT_REFRESH_SECRET_KEY: Joi.string().required().length(64), // 256 bits
  JWT_REFRESH_EXPIRES: Joi.number().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  API_VERSION: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required().port(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASS: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
});
