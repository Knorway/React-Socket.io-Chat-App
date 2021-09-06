import { useAppSelector } from '../store';

export const useAuth = () => {
	const user = useAppSelector((state) => state.auth.user);
	const isValidating = useAppSelector((state) => state.auth.isValidating);

	return { user, isValidating };
};
