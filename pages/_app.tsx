import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import { DefaultLayout } from "@app/layouts";

import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<DefaultLayout>
				<Component {...pageProps} />
			</DefaultLayout>
		</QueryClientProvider>
	);
}

export default MyApp;
