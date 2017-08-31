import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.route('/:id')
  .get(userController.getUser);

router.route('/login')
  .post(userController.loginUser);

router.route('/register')
  .post(userController.createUser);

export default router;