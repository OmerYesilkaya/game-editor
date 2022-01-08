import AppWrapper from "App";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "../styles/globals.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: Infinity,
			cacheTime: 10000,
			retry: 2,
		},
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<AppWrapper>
				<Component {...pageProps} />
				<ReactQueryDevtools toggleButtonProps={{ className: "-translate-x-2 -translate-y-2" }} position="bottom-right" />
			</AppWrapper>
		</QueryClientProvider>
	);
}

export default MyApp;
