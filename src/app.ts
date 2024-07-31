import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors);

const mongoUri = process.env.MONGO_URI || "mongodb+srv://jesudunsinadesina:Dunsin23@cluster0.yrilnl4.mongodb.net/";

mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 30000
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });

app.use('/books', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;