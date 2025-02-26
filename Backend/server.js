import express from 'express'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js'
import authRoutes from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import blogRoutes from './src/routes/blogRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
const PORT = process.env.PORT


const app = express();

app.use(express.json());

app.use(cors({
    origin: "https://blogspotmern.vercel.app",
    credentials: true,
  }));

  app.use(cookieParser());


  //--------Main Endpoints------------ 
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/blog', blogRoutes);


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
    connectDB();
})