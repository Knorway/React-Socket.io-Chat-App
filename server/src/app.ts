import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';
import morgan from 'morgan';
import cors from 'cors';
import { User } from './entity/User';

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

app.set('port', process.env.PORT || 4000);
app.set('io', io);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));
// app.use(cors({ origin: ['http://localhost:3000'] }));

app.get('/', (req, res) => {
	res.send('<h1>Socket.io Backend</h1>');
});

app.post('/join', async (req, res) => {
	const { firstName, lastName, age } = req.body;
	const user = await User.create({ firstName, lastName, age }).save();
	res.json(user);
});

app.get('/info', async (req, res) => {
	const user = await User.find();
	res.json(user);
});

io.on('connection', (socket) => {
	console.log(socket.id, 'connect');
	console.log(Object.keys(io.sockets.sockets).length);

	socket.on('disconnect', () => {
		// socket.disconnect(true);
		console.log(Object.keys(io.sockets.sockets).length);
		console.log(socket.id, 'disconnect');
	});
});

export { app, server };
