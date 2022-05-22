import dotenv from 'dotenv';

dotenv.config();

export const LISTING_STATUS = {
  NEW: 'new',
  APPROVED: 'approved',
  ARCHIVED: 'archived',
};

export const NODE_ENVIRONMENTS = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  STAGING: 'staging',
};

export const USER_ROLES = {
  SUPERADMIN: 'super admin',
  ADMIN: 'admin',
  USER: 'user',
};

export const DB_CONNECTION_URL = process.env.MONGO_URI

export const CLIENT_APP_BASE_URL =
  process.env.NODE_ENV === NODE_ENVIRONMENTS.DEVELOPMENT
    ? process.env.SITE_BASE_URL_DEVELOPMENT
    : process.env.NODE_ENV === NODE_ENVIRONMENTS.STAGING
    ? process.env.SITE_BASE_URL_STAGING
    : process.env.SITE_BASE_URL_PRODUCTION;

