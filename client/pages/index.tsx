import { client } from '../src/api';
import HomePage from '../src/components/pages/home';

export default function Home({ data }) {
	console.log(data);

	return <HomePage />;
}

export const getStaticProps = async () => {
	const response = await client('/info');

	return {
		props: {
			data: response.data,
		},
	};
};
