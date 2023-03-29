import { SessionProvider } from "next-auth/react";
import { ConfigProvider } from "antd";
import theme from "../styles/theme";

import "normalize.css/normalize.css";
import "../styles/global.scss";

export default function App({ Component, session, ...pageProps }) {
	return (
		<ConfigProvider theme={theme}>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</ConfigProvider>
	);
}
