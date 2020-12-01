import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import JobDeatils from "./component/JobDeatils";
import * as serviceWorker from "./serviceWorker";
import ThemeContextProvider from "./context/ThemeContext";

import Header from "./component/header.jsx";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
	<React.StrictMode>
		<ThemeContextProvider>
			<Router>
				<Route>
					<Header />
					<Switch>
						<Route path='/job/:url' component={JobDeatils} />
						<Route path='/' component={App} />
					</Switch>
				</Route>
			</Router>
		</ThemeContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
