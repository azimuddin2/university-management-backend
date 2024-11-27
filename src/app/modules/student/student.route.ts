import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.post('/', StudentControllers.handleCreateStudent);

export const StudentRoutes = router;
