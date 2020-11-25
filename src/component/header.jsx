import React from "react";

import Logo from "./images/devjobs.svg";
import sun from "./images/icons/sun.svg";
import moon from "./images/icons/moon.svg";

import { Link } from "react-router-dom";
const Header = () => {
	return (
		<header className='header-logo'>
			<div className='container'>
				<div className='row'>
					<div className='col-sm-12 col-md-12 col-lg-12 col-header'>
						<div>
							<Link to='/'>
								<img src={Logo} className='img-fluid' alt='logo' />
							</Link>
						</div>
						<div>
							<img src={sun} alt='light' />
							<label className='switch'>
								<input type='checkbox' />
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
