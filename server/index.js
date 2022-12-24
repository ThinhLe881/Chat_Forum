const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoute = require('./router/user');
const postRoute = require('./router/post');
const voteRoute = require('./router/vote');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;
mongoose
	.connect(process.env.MONGODB_URI, {
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

app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/vote', voteRoute);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
