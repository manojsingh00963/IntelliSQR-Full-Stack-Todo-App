import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import authRoutes from './routes/auth';
import todoRoutes from './routes/todos';
import { errorHandler } from './middlewares/errorHandler';
import { requestLogger } from './middlewares/requestLogger';


const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(requestLogger);


app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);


app.use(errorHandler);


export default app;