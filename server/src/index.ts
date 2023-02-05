import dotenv from 'dotenv';
import 'module-alias/register';
import App from './app';
import ComparisonController from '@/controllers/Comparison.controller';

dotenv.config();

const controllers = [new ComparisonController()];

const app = new App(controllers, Number(process.env.PORT) || 3000);

app.listen();
