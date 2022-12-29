import express from 'express';
import { set, connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';

import authRoute from './routers/auth.js';
import userRoute from './routers/user.js';
import postRoute from './routers/post.js';
import commentRoute from './routers/comment.js';

config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

set('strictQuery', true);
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
