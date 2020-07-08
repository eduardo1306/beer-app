import { Joi } from 'celebrate';

export const brewerCelebrateConfig = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    city: Joi.string().required(),
    uf: Joi.string().max(2).required(),
    whatsapp: Joi.number().required(),
    photo: Joi.string(),
  }),
};

export const beerCelebrateConfig = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    coloring: Joi.string().required(),
    ibu: Joi.string().required(),
    description: Joi.string().max(450).required(),
    image: Joi.string(),
  }),
};
