import express from 'express';
import userRoute from './userRoute';
import authRoute from './authRoute';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);

export default router;