import express from 'express';
import { auth } from '../controllers';
import { AsyncHandler, jwtAuth } from '../lib';

export const router = express.Router();

router.post('/register', AsyncHandler(auth.registerUser));
router.post('/login', AsyncHandler(auth.loginUser));
router.get('/validate', jwtAuth, AsyncHandler(auth.validateUser));
