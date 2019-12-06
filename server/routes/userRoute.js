import express from 'express';
import UserController from '../controllers/userController';
// import Validate from '../middlewares/Validate';

const router = express.Router();

router.post('/auth/signup',  UserController.userSignup);
router.post('/auth/signin', UserController.userLogin);

export default router; 