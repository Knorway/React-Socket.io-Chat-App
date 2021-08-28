import axios from 'axios';

const API_URL =
	process.env.NODE_ENV === 'production'
		? 'http://localhost:4000'
		: 'http://localhost:4000';

export const client = axios.create();
client.defaults.baseURL = API_URL;
