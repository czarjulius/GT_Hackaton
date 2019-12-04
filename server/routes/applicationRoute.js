import express from 'express';
import accountController from '../controllers/application_form';

const router = express.Router();

router.post('/apply', accountController.postApplicationForm);

export default router;