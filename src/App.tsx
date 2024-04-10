import { ConfigProvider } from "antd";
import React from "react";
import { Background } from "./background";
import { Popup } from "./Popup";
import { DataProvider } from "./context";

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
