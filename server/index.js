import express from 'express';
import { set, connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';

import authRoute from './routers/auth.js';
import userRoute from './routers/user.js';
import postRoute from './routers/post.js';
import commentRoute from './routers/comment.js';
import topicRoute from './routers/topic.js';
import voteRoute from './routers/vote.js';
import { apiLimiter } from './middlewares/apiLimiter.js';

const app = express();
app.use(cors());
app.use(express.json());
config();

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
app.use('/users', apiLimiter, userRoute);
app.use('/posts', apiLimiter, postRoute);
app.use('/comments', apiLimiter, commentRoute);
app.use('/topics', apiLimiter, topicRoute);
app.use('/votes', apiLimiter, voteRoute);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
