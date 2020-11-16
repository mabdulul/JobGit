import React from "react";
import { useState, useEffect } from "react";
import { getJobs } from "./component/apiFetch";
import useFetchJobs from "./component/useFetchJobs.js";
import SearchBar from "./component/searchBar";
import JobsPagination from "./component/JobsPagination";

import "normalize.css";

//CSS
import "./component/css/header.css";
import "./component/css/jobs.css";

//Header images
import Logo from "./component/images/devjobs.svg";
import sun from "./component/images/icons/sun.svg";
import moon from "./component/images/icons/moon.svg";

function App() {
	let [page, setPage] = useState(1);
	const [type, setType] = useState("");
	const [location, setLocation] = useState("");
	const [fulltime, setFulltime] = useState(false);
	const [state, dispatch] = useFetchJobs();

	const [jobsLength, setjobsLength] = useState("");

	const fetchJobs = async (type, fulltime, location, page) => {
		setPage(1);
		dispatch({ type: "FETCH_LOADING" });
		await getJobs(type, fulltime, location, 1)
			.then((response) => {
				dispatch({ type: `FETCH_SUCCESS`, payload: response });
			})
			.then((res) => {
				return res;
			})
			.catch((error) => dispatch({ type: "FETCH_ERROR" }));
	};

	useEffect(() => {
		//UseEffect only need to run once start
		fetchJobs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		fetchJobs(type, fulltime, location, page);
	};

	const LoadMore = async (e) => {
		e.preventDefault();
		dispatch({ type: "FETCH_LOAD_MORE_LOADING" });
		setPage(++page);
		await getJobs(type, fulltime, location, page)
			.then((response) => {
				dispatch({ type: `FETCH_LOADMORE`, payload: response });
				setjobsLength(state.jobs.length);
			})
			.then((res) => {
				return res;
			})
			.catch((error) => dispatch({ type: "FETCH_ERROR" }));
	};

	return (
		<>
			<header className="header-logo">
				<div className="container">
					<div className="row">
						<div className="col-sm-12 col-md-12 col-lg-12 col-header">
							<div>
								<img src={Logo} className="img-fluid" alt="logo" />
							</div>
							<div>
								<img src={sun} alt="light" />
								<label className="switch">
									<input type="checkbox" />
									<span className="slider round"></span>
								</label>
								<img src={moon} alt="light" />
							</div>
						</div>
					</div>
				</div>
			</header>
			<div className="container">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-lg-12 ">
						<SearchBar
							onSubmit={onSubmit}
							location={state.location}
							fulltime={fulltime}
							type={type}
							setType={setType}
							setLocation={setLocation}
							setFulltime={setFulltime}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-12 col-lg-12 ">
						{state.loading && <h1>Loading...</h1>}
						{!!state.error}
						<div>
							{state.jobs.length === 0 && state.loading === false ? (
								<p>No jobs found</p>
							) : (
								<>
									<>
										<div className="Jobs-wrapper">
											{state.jobs.map((jo) => (
												<div className="Job-single" key={jo.id}>
													<ul key={jo.id}>
														<li className="company-logoHolder">
															{!jo.company_logo ? (
																<p className="company-logo">Null</p>
															) : (
																<img
																	src={jo.company_logo}
																	alt="company-logo"
																	className="company-logo"
																/>
															)}
														</li>
														<li className="when-created">
															{jo.created_at}
															<span className="dot"></span>
															<span className="type">{jo.type}</span>
														</li>
														<li className="title">{jo.title}</li>
														<li className="company">{jo.company}</li>
														<li className="location">
															<span>{jo.location}</span>
														</li>
													</ul>
												</div>
											))}
										</div>
									</>
								</>
							)}
						</div>

						<div>{state.loadingMore && <h1>Loading... More</h1>}</div>
						<div>
							{jobsLength === state.jobs.length ? (
								" "
							) : (
								<JobsPagination LoadMore={LoadMore} />
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
