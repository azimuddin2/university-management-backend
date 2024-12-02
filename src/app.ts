import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello University Management System Software Application');
});

app.use(globalErrorHandler);

export default app;
