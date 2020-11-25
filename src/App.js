import React from "react";
import { useState, useEffect } from "react";
import { getJobs } from "./component/apiFetch";
import useFetchJobs from "./component/useFetchJobs.js";
import SearchBar from "./component/searchBar";
import JobsPagination from "./component/JobsPagination";
import LoadingScreen from "./component/Loading";

import Header from "./component/header.jsx";

import "normalize.css";

//CSS
import "./component/css/header.css";
import "./component/css/jobs.css";

import CompanyHolder from "./component/images/icons/company-placeholder.png";

import Moment from "react-moment";

import { Link } from "react-router-dom";

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
			<Header />
			<div className='container'>
				<div className='row'>
					<div className='col-sm-12 col-md-12 col-lg-12 '>
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
				<div className='row'>
					<div className='col-sm-12 col-md-12 col-lg-12 '>
						{state.loading && <LoadingScreen />}
						{!!state.error}
						<div className='Job-div'>
							{state.jobs.length === 0 && state.loading === false ? (
								<p>No jobs found</p>
							) : (
								<>
									<>
										<div className='Jobs-wrapper'>
											{state.jobs.map((jo) => (
												<Link
													className='Job-post'
													key={jo.id}
													to={`/job/${jo.id}`}
												>
													<div className='Job-company'>
														<div className='company-logoHolder'>
															{!jo.company_logo ? (
																<img
																	src={CompanyHolder}
																	alt='company-logo'
																	className='company-logo'
																/>
															) : (
																<img
																	src={jo.company_logo}
																	alt='company-logo'
																	className='company-logo'
																/>
															)}
														</div>
													</div>
													<div key={jo.id} className='Job-post-wrapper'>
														<div className='Job-Deatils'>
															<div className='date-created'>
																<span>
																	{" "}
																	<Moment fromNow>{jo.created_at}</Moment>
																</span>
																<span className='Job-dot'>•</span>
																<span className='Job-type'>{jo.type}</span>
															</div>
															<div className='Job-title'>
																<p>{jo.title}</p>
															</div>
															<div className='Job-companyname'>
																{jo.company}
															</div>

															<div className='Job-location'>
																<span>{jo.location}</span>
															</div>
														</div>
													</div>
												</Link>
											))}
										</div>
									</>
								</>
							)}
						</div>

						<div>{state.loadingMore && <LoadingScreen />}</div>
						<div className='d-flex justify-content-center btn-loading'>
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
