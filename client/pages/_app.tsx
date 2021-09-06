import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { useInitializeAuth } from '../src/hooks/useInitializeAuth';
import wrapper from '../src/store';

function Application({ Component, pageProps }: AppProps) {
	useInitializeAuth();

	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default wrapper.withRedux(Application);
