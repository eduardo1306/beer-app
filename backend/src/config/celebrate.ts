import { Joi } from 'celebrate';

export const brewerCreateCelebrateConfig = {
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

export const brewerUpdatePhotoCelebrateConfig = {
  body: Joi.object().keys({
    photo: Joi.string(),
  }),
};

export const beerUpdatePhotoCelebrateConfig = {
  body: Joi.object().keys({
    image: Joi.string(),
  }),
};

export const beerCreateCelebrateConfig = {
  body: Joi.object().keys({
    title: Joi.string().max(60).required(),
    coloring: Joi.string().max(20).required(),
    ibu: Joi.string().max(20).required(),
    description: Joi.string().max(450).required(),
    image: Joi.string(),
  }),
};
