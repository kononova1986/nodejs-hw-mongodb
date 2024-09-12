import Joi from 'joi';
import { contactTypeList } from '../constants/contacts.js';

export const ContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(10).max(13).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(6).max(16),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactTypeList),
});

export const patchContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(10).max(13),
  email: Joi.string().email(),
  age: Joi.number().integer().min(6).max(16),
  isFavourite: Joi.boolean(),
  contactType: Joi.string(),
});
