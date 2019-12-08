import express from 'express';
import identityController from '../controllers/identityController';
import authenticate from '../middlewares/authentication';
import upload from '../multer/config';

const router = express.Router();
const uploadArray = [
    {name:'passport', maxCount:1},
    {name:'signature', maxCount:1}
]
router.post('/identity', upload.fields(uploadArray), authenticate, identityController.postIdentity);
router.get('/identity', authenticate, identityController.getAllIdentity);
router.get('/identity/:id', authenticate, identityController.getSingleId);

export default router;