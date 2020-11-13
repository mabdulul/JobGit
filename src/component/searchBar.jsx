import React from "react";
import { useState } from "react";
import "./css/search.css";
import Search from "./images/icons/search_MandT.svg";
import LocationIcon from "./images/icons/location.svg";

import drilldown from "./images/icons/drilldown.svg";
import searchWhite from "./images/icons/white_search.svg";
import Modal from "react-bootstrap/Modal";
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

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<div className="SearchBar-wrapper">
				<form onSubmit={onSubmit} className="SearchBar">
					<div className="mobile-search-holder">
						<img
							className="search-icons only-display-on-tablet-and-Desktop"
							src={Search}
							alt="search"
						/>
						<div className="search_Input-holder">
							<input
								className="search_Input"
								type="text"
								placeholder="Filter by title..."
								name="type"
								value={type}
								onChange={(e) => setType(e.target.value)}
							/>
						</div>
						<div className="search_drilldown-holder search-holder-modal">
							<Button className="btn-modal" onClick={handleShow}>
								<img src={drilldown} alt="drilldown" />
							</Button>
						</div>
						<div className="search-holder search-holder-white">
							<button className="btn btn-search" type="submit">
								<img className="search-icons" src={searchWhite} alt="search" />
							</button>
						</div>
					</div>

					<Modal show={show} onHide={handleClose} animation={false}>
						<form onSubmit={onSubmit}>
							<div className="mobile-search-holder-modal">
								<div className="modal-location">
									<div>
										<img
											className="search-icons search-icon-modal"
											src={LocationIcon}
											alt="LocationIcon"
										/>
										<input
											className="Search_Input"
											type="text"
											placeholder="Filter by location…"
											name="location"
											value={location}
											onChange={(e) => setLocation(e.target.value)}
										/>
									</div>
								</div>
								<hr className="searchModal-hr" />

								<div className="Search_container">
									<label className="container_check">
										<div className="Search_FullTime">Full Time Only</div>
										<input
											className="Search_Input"
											type="checkbox"
											name="fulltime"
											value={fulltime}
											onChange={(e) => setFulltime(!!!fulltime)}
										/>

										<div className="checkmark"></div>
									</label>
								</div>
								<button className="btn btn-search-modal" type="submit">
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
