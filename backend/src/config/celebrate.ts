import { Joi } from 'celebrate';

export default {
  body: Joi.object().keys({
    name: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    city: Joi.string().required(),
    uf: Joi.string().max(2).required(),
    whatsapp: Joi.number().required(),
  }),
};
