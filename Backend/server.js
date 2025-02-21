import express from 'express'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js'
import userRoutes from './src/routes/authRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
const PORT = process.env.PORT


const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));
  
  app.use(cookieParser());


  
app.use('/api/auth', userRoutes)


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
    connectDB();
})