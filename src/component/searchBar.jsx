import React from "react";
import { useState, useEffect } from "react";
import "./css/search.css";
import Search from "./images/icons/search_MandT.svg";
import LocationIcon from "./images/icons/location.svg";

import drilldown from "./images/icons/drilldown.svg";
import searchWhite from "./images/icons/white_search.svg";
import Modal from "react-bootstrap/Modal";

import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

import moment from "moment";
import Button from "react-bootstrap/Button";
const SearchBar = ({
	onSubmit,
	location,
	fulltime,
	type,
	setType,
	setLocation,
	setFulltime,
}) => {
	const [show, setShow] = useState(false);
	const [placeholder, setPlaceHolder] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const themeContext = useContext(ThemeContext);

	const { isLightTheme, light, dark } = themeContext;
	const theme = isLightTheme ? light : dark;

	useEffect(() => {
		if (window.innerWidth >= 774 && window.innerWidth < 1003) {
			setPlaceHolder("Title...");
		} else {
			setPlaceHolder("Filter by title");
		}
	}, []);

	moment.updateLocale("en", {
		relativeTime: {
			future: "in %s",
			past: "%s ago",
			s: "a few seconds",
			ss: "%d seconds",
			m: "1 min",
			mm: "%d min",
			h: "1h",
			hh: "%dh",
			d: "1d",
			dd: "%dd",
			w: "1w",
			ww: "%dw",
			M: "1mo",
			MM: "%dmo",
			y: "1 year",
			yy: "%d years",
		},
	});

	return (
		<>
			<div className='SearchBar-wrapper'>
				<form onSubmit={onSubmit} className='SearchBar'>
					<div
						className='Search_Container search-wrapper '
						style={{ backgroundColor: theme.bg }}
					>
						<div className='search_Input-holder another-wrapper'>
							<img
								className='search-icons search-DandT'
								src={Search}
								alt='search'
							/>
							<input
								className='search_Input'
								type='text'
								placeholder={placeholder}
								name='type'
								value={type}
								onChange={(e) => setType(e.target.value)}
								style={{ backgroundColor: theme.bg, color: theme.syntaxt }}
							/>
						</div>
						<div className='modal-locationDandT warpper-location '>
							<div className='another-wrapper'>
								<img
									className='search-icons'
									src={LocationIcon}
									alt='LocationIcon'
								/>
								<input
									className='Search_Input'
									type='text'
									placeholder='Filter by location…'
									name='location'
									value={location}
									onChange={(e) => setLocation(e.target.value)}
									style={{ backgroundColor: theme.bg, color: theme.syntaxt }}
								/>
							</div>
						</div>
						<div className='search-DandT test Search-CheckBox  '>
							<div className='another-wrapper'>
								<label className='container_check'>
									<div
										className='Search_FullTime'
										style={{ color: theme.syntaxt }}
									>
										FullTime{" "}
									</div>
									<input
										className='Search_Input'
										type='checkbox'
										name='fulltime'
										value={fulltime}
										onChange={(e) => setFulltime(!!!fulltime)}
										style={{ backgroundColor: theme.bg, color: theme.syntaxt }}
									/>

									<div className='checkmark'></div>
								</label>
								<div className='search-holder search-holder-white '>
									<button className='btn btn-search' type='submit'>
										<span className='search-DandT'>Search</span>
									</button>
								</div>
							</div>
						</div>
						<div className='search_drilldown-holder search-holder-modal'>
							<Button className='btn-modal' onClick={handleShow}>
								<img src={drilldown} alt='drilldown' />
							</Button>
						</div>
						<div className='search-holder search-holder-white onlyOnmobile'>
							<button className='btn btn-search' type='submit'>
								<img
									className='search-icons onlyOnmobile'
									src={searchWhite}
									alt='search'
								/>
							</button>
						</div>
					</div>

					<Modal show={show} onHide={handleClose} animation={false}>
						<form onSubmit={onSubmit}>
							<div
								className='Search_Container-modal search-wrapper'
								style={{ backgroundColor: theme.bg }}
							>
								<div className='modal-location'>
									<div>
										<img
											className='search-icons search-icon-modal'
											src={LocationIcon}
											alt='LocationIcon'
										/>
										<input
											className='Search_Input'
											type='text'
											placeholder='Filter by location…'
											name='location'
											value={location}
											onChange={(e) => setLocation(e.target.value)}
											style={{
												backgroundColor: theme.bg,
												color: theme.syntaxt,
											}}
										/>
									</div>
								</div>
								<hr className='searchModal-hr' />

								<div className='Search_checkbox'>
									<label className='container_check'>
										<div
											className='Search_FullTime'
											style={{ color: theme.syntaxt }}
										>
											Full Time Only
										</div>
										<input
											className='Search_Input'
											type='checkbox'
											name='fulltime'
											value={fulltime}
											onChange={(e) => setFulltime(!!!fulltime)}
											style={{
												backgroundColor: theme.bg,
												color: theme.syntaxt,
											}}
										/>

										<div className='checkmark'></div>
									</label>
								</div>
								<button className='btn btn-search-modal' type='submit'>
									Search
								</button>
							</div>
						</form>
					</Modal>
				</form>
			</div>
		</>
	);
};

export default SearchBar;
