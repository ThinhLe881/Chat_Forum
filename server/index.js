import express, { json } from 'express';
import { set, Promise, connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';

import authRoute from './routers/auth';
import userRoute from './routers/user';
import postRoute from './routers/post';
import commentRoute from './routers/comment';

config();

const app = express();
app.use(cors());
app.use(json());

const PORT = process.env.PORT || 8000;

set('strictQuery', true);
Promise = global.Promise;
connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log(`Connected to MongoDB`);
	})
	.catch((error) => console.log(error.message));

app.get('/', function (req, res) {
	return res.send('Welcome to Chat Forum');
});

app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/posts', postRoute);
app.use('/comments', commentRoute);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
