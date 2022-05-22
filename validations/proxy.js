import Joi from 'joi';

export const validateAddProxy = (data) => {
  const schema = Joi.object({
    proxy_name: Joi.string().required().min(3).trim(),
    ip: Joi.string().required().min(3).trim(),
    port: Joi.string().required().min(3).trim(),
    bandwidth: Joi.string().required().min(3).trim(),
    email: Joi.string().required().trim().max(100),
    time: Joi.string().required().min(1).trim(),
    user_id: Joi.string().required().min(1).trim(),
  });
  return schema.validate(data);
};