import generateToken from '../utils/generateToken.js';

export const userAuthenticateSuccessResponse = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    parentId: user.parentId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    token: generateToken(user._id),
  };
};