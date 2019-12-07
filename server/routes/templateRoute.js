import express from 'express';
import templateController from '../controllers/templateController';
import authenticate from '../middlewares/authentication';
import upload from '../multer/config';

const router = express.Router();

router.post('/template', upload.single('template'), authenticate, templateController.submitTemplate);

export default router;