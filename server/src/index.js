import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import http from 'http';
import { setUpSocket } from './routes/socket.js'
import { userRouter } from './routes/users.js'
import { songRouter } from './routes/songs.js';
import config from '../config.json' assert { type: 'json' };



const app = express();
const server = http.createServer(app);


app.use(express.json())
app.use(cors({
    origin: '*',
    credentials: true
  }));

setUpSocket(server)

app.use('/users', userRouter)
app.use("/songs", songRouter)

const mongoUri = config.MONGO_URI
mongoose.connect(mongoUri)
    .then(() => console.log("DATABASE CONNECTED"))
    .catch(() => console.log("FAILD TO CONNECT DATABASE"))

const port = config.PORT
server.listen(port, () => console.log("SERVER STARTED"))

