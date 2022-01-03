import AppWrapper from "App";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<AppWrapper>
				<Component {...pageProps} />
			</AppWrapper>
		</QueryClientProvider>
	);
}

export default MyApp;
