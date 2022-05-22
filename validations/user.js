import Joi from 'joi';

export const validateSignUpUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).trim(),
    email: Joi.string().required().trim().max(100),
    password: Joi.string().required().min(6),
    role: Joi.string().required().trim(),
    parentId: Joi.string().required().trim(),
  });
  return schema.validate(data);
};

export const validateSignInUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().trim().max(100),
    password: Joi.string().required().min(6),
  });
  return schema.validate(data);
};

export const validateForgotPassword = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().trim().max(100),
  });
  return schema.validate(data);
};

export const validateResetPassword = (data) => {
  const schema = Joi.object({
    password: Joi.string().required().min(6),
  });
  return schema.validate(data);
};

export const validateUpdateProfile = (data) => {
  const schema = Joi.object({
    id: Joi.string(),
    name: Joi.string().min(3).required(),
    artistName: Joi.string().min(3).required(),
    email: Joi.string(),
    password: Joi.string().min(6),
    phone: Joi.string(),
    about: Joi.string().max(1500),
    address: {
      country: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      street_address: Joi.string().required(),
      zipcode: Joi.string().required(),
      full: Joi.string().required(),
    },
    location: {
      type: Joi.string(),
      coordinates: Joi.array(),
    },
    pricePerSquareFoot: Joi.number(),
    paySplitPreference: Joi.string(),
    acceptCryptoPayment: Joi.boolean(),
    experienceLevel: Joi.string(),
    completedMurals: Joi.string(),
    art_types: Joi.array(),
    instagram_handle: Joi.string().optional(),
    website: Joi.string().optional(),
    Porfolio_link: Joi.string().optional(),
    gallery: Joi.array(),
    colorPallete: Joi.array(),
    colorPalette: Joi.array(),
    logo: Joi.array(),
    artistImage: Joi.array(),
    brand: Joi.array(),
    isVerified: Joi.boolean(),
    portfolio: Joi.array(),
    exhibitions: Joi.string(),
  });
  return schema.validate(data);
};
