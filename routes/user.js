import express from 'express';
const router = express.Router();

import {
  login,
  deleteUser,
  register,
  editUser,
  getUsers
} from '../controllers/user.js';
import { protect } from '../middleware/auth.js';

router
  .route('/')
  .post(register);
router.get('/:id', getUsers);
router.delete('/:id', deleteUser);
router.put('/:id', editUser);
router.post('/login', login);

export default router;
