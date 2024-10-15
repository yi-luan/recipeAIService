import express from 'express';
import { RegisterRoutes } from '../routes';

const router = express.Router();
RegisterRoutes(router);

export default router;
