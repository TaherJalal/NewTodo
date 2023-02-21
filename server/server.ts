import express from 'express'
import todoRoutes from './routes/todo'
import authRoutes from './routes/auth'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()


app.use(cors({
    origin: "http://localhost:3000"
}))


const port = process.env.PORT || 8000


app.use(express.json())
mongoose.set('strictQuery', false)

app.use('/todo' , todoRoutes)
app.use('/auth' , authRoutes)


mongoose.connect("mongodb://127.0.0.1:27017/Todos", 
() => console.log('connected to mongoDB'))

app.listen(port , () => console.log('server is working on port 8000'))