import { ConfigProvider } from "antd";
import React from "react";
import { Background } from "./background";
import { DataProvider } from "./context";
import { Popup } from "./popup";

const App: React.FC = () => (
	<ConfigProvider
		theme={{
			token: {
				colorPrimary: "#16182E",
				borderRadius: 6,
			},
		}}
	>
		<Background>
			<DataProvider>
				<Popup />
			</DataProvider>
		</Background>
	</ConfigProvider>
);

export default App;
