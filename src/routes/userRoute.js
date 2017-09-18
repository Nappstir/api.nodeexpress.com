import express from 'express';
import * as userController from '../controllers/userController';
import verifyToken from '../helpers/tokenVerification';

const router = express.Router();

router.route('/:id')
  .get(verifyToken, userController.getUser);

export default router;