import NextHead from 'next/head';
import HomePage from '../src/components/pages/home';

export default function Home() {
	return (
		<>
			<NextHead>
				<title>Let's Chat!</title>
				<meta name='description' content='react socket.io chat application' />
			</NextHead>
			<HomePage />
		</>
	);
}
