import axios from 'axios';

export const devProd = (devKey: string, prodKey: string) => {
	if (process.env.NODE_ENV === 'production') return prodKey;
	else return devKey;
};

export const API_URL = devProd('http://localhost:4000', 'http://localhost:4000');
export const REGISTER_URL = devProd(API_URL + '/auth/register', '');
export const LOGIN_URL = devProd(API_URL + '/auth/login', '');
export const VALIDATE_URL = devProd(API_URL + '/auth/validate', '');

export const client = axios.create();
client.defaults.baseURL = API_URL;
