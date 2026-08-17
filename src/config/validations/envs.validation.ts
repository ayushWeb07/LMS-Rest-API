import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .required()
    .valid('development', 'production', 'testing'),
  SERVER_PORT: Joi.number().required().port(),
  JWT_SECRET_KEY: Joi.string().required().length(64), // 256 bits
  JWT_EXPIRES: Joi.number().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required().port(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASS: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
});
