import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.route('/:id')
  .get(userController.getUser);

export default router;