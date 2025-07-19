import dotenv from 'dotenv'; dotenv.config();
import App from './src/App'; App.Start(Number(process.env.PORT) || 8080);