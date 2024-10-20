
import { PORT, NODE_ENV } from "./utils/config";
import db from "./database/db"
import userRouter from './routes/UserRouter';
import express = require('express');
import cors = require('cors');

export const app = express();

app.use(cors())
app.use(express.json())
app.use('/api/', userRouter)
app.use(express.static('storage'))

try {
	db.authenticate()
	console.log('💫💫💫conected to database💫💫💫')
} catch (error) {
	console.log(`error:' ${error}`)
}

if (NODE_ENV !== 'test') {
	app.listen(PORT, () => {
		console.log(`🚀server up in http://localhost:${PORT}/`)
	})
}