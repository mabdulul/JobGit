import React from "react";

import Logo from "./images/devjobs.svg";
import sun from "./images/icons/sun.svg";
import moon from "./images/icons/moon.svg";

import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

import { Link } from "react-router-dom";
const Header = () => {
	const themeContext = useContext(ThemeContext);
	const { isLightTheme, toggleTheme, light, dark } = themeContext;

	const theme = isLightTheme ? light : dark;

	document.body.style.backgroundColor = theme.bodyColor;

	console.log(isLightTheme);

	return (
		<header className='header-logo'>
			<div className='container'>
				<div className='row'>
					<div className='col-sm-12 col-md-12 col-lg-12 col-header'>
						<div>
							<Link to='/'>
								<img
									src={Logo}
									className='img-fluid'
									alt='logo'
									onClick={() => window.location.reload(false)}
								/>
							</Link>
						</div>
						<div>
							<img src={sun} alt='light' />
							<label className='switch'>
								<input
									type='checkbox'
									onClick={toggleTheme}
									value={isLightTheme}
								/>

								<span className='slider round'></span>
							</label>
							<img src={moon} alt='light' />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
