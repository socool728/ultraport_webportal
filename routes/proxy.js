import express from 'express';
const router = express.Router();

import {
  addProxy,
  getProxy,
  deleteProxy,
  changeStatusOfProxy,
  downloadProxyFile,
} from '../controllers/proxy.js';

router
  .route('/')
  .post(addProxy);
router.delete('/:id', deleteProxy);
router.get('/:id', getProxy);
router.post('/change_status_proxy', changeStatusOfProxy);
router.get('/downloadProxyFile/:url', downloadProxyFile);
// router.put('/:id', editUser);

export default router;
