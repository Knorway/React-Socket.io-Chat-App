import { AppProps } from 'next/dist/shared/lib/router/router';
import { ChakraProvider } from '@chakra-ui/react';
import wrapper from '../src/store';
import { theme } from '../src/styles';
import { useInitializeAuth } from '../src/hooks/useInitializeAuth';

function Application({ Component, pageProps }: AppProps) {
	useInitializeAuth();

	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default wrapper.withRedux(Application);
