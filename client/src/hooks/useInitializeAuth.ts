import { useEffect } from 'react';
import { client, VALIDATE_URL } from '../api';
import { useAppDispatch } from '../store';
import { authActions } from '../store/auth';

export const useInitializeAuth = async () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		(async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) return;

				const response = await client(VALIDATE_URL, {
					headers: { Authorization: `Bearer ${token}` },
				});

				dispatch(authActions.setUser(response.data));
			} catch (error) {
				console.log(error);
			} finally {
				dispatch(authActions.setIsValidating(false));
			}
		})();
	}, [dispatch]);
};
