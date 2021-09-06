import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './lib';
import { authRouter } from './routes';

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

app.set('port', process.env.PORT || 4000);
app.set('io', io);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));
app.use(cors({ origin: ['http://localhost:3000'] }));

app.use('/auth', authRouter);

app.use(errorHandler);

app.get('*', (req, res) => {
	res.redirect('http://localhost:3000');
});

export { app, server, io };
