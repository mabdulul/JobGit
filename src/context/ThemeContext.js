import React, { createContext, Component } from "react";

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
	state = {
		isLightTheme: true,
		light: { syntaxt: "#19202D", ui: "#ddd", bg: "#fff", bodyColor: "#f2f2f2" },
		dark: {
			syntaxt: "#FFF",
			ui: "#333",
			bg: "#19202D",
			bodyColor: "#131722",
		},
	};

	toggleTheme = () => {
		this.setState({ isLightTheme: !this.state.isLightTheme });
	};
	render() {
		return (
			<ThemeContext.Provider
				value={{ ...this.state, toggleTheme: this.toggleTheme }}
			>
				{this.props.children}
			</ThemeContext.Provider>
		);
	}
}

export default ThemeContextProvider;
