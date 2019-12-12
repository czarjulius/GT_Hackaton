import express from 'express';
import nextOfKinController from '../controllers/nextOfKinController';
import authenticate from '../middlewares/authentication';

const router = express.Router();

router.post('/nextofkin', authenticate, nextOfKinController.postNextOfKin);
router.get('/nextofkin', authenticate, nextOfKinController.getAllNextOfKin);
router.get('/nextofkin/:id', authenticate, nextOfKinController.getSingleNextOfKin);
router.get('/nextofkinByUserId/:id', authenticate, nextOfKinController.getSingleNextOfKinByUserId);

export default router;