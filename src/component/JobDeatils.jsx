import React from "react";
import { useEffect, useState } from "react";
import Header from "./header.jsx";
import useFetchJobs from "./useFetchJobs.js";
import { useParams } from "react-router-dom";
import { getJobDetails } from "./apiFetch";
import LoadingScreen from "./Loading";

import Moment from "react-moment";
import Parser from "html-react-parser";

import CompanyHolder from "./images/icons/company-placeholder.png";

import "./css/Deatils.css";

const JobDeatils = () => {
	let { url } = useParams();
	const [state, dispatch] = useFetchJobs();
	const [applynow, setapplyNow] = useState("");

	useEffect(() => {
		dispatch({ type: "FETCH_LOADING" });
		const fetchJobs = async () => {
			await getJobDetails(url)
				.then((response) => {
					const expression = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/;
					let regex = new RegExp(expression);

					const test = response.how_to_apply.match(regex)[1];
					setapplyNow(test);
					dispatch({ type: `FETCH_SUCCESS`, payload: response });
				})
				.then((res) => {
					return res;
				})
				.catch((error) => dispatch({ type: "FETCH_ERROR" }));
		};
		fetchJobs();

		return () => {
			console.log("removed");
			dispatch({ type: "FETCH_CLEAR" });
		};
	}, [url, dispatch]);

	console.log(state.jobs);

	return (
		<>
			<Header />
			<div className='container'>
				{state.loading ? (
					<LoadingScreen />
				) : (
					<>
						<div className='row'>
							<div className='col-sm-12 col-md-12 col-lg-12 Deatils '>
								<div key={state.jobs.id} className='Deatils-Wrapper '>
									{state.loading}
									{state.jobs.length === 0 && state.loading === false ? (
										<p>Something went wrong. Try reloading</p>
									) : (
										<>
											<div className='Deatils-company-wrapper'>
												<div className='Deatils-logo'>
													{!state.jobs.logo ? (
														<img
															src={state.jobs.company_logo}
															alt='company-logo'
														/>
													) : (
														<img
															src={CompanyHolder}
															alt='company-logo'
															className='company-logo'
														/>
													)}
												</div>
												<div className='Deatils-companyName-wrapper'>
													<p className='company-name'>{state.jobs.company}</p>
													<div className='btn-link'>
														<a href={state.jobs.company_url}>Company Site</a>
													</div>
												</div>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
						<div>
							<div className='col-sm-12 col-md-12 col-lg-12 '>
								<div className='Deatils-more'>
									<div>
										<div className='Description-Top'>
											<span>
												<Moment fromNow>{state.jobs.created_at}</Moment>
											</span>
											<span className='Job-dot'>•</span>
											<span className='Job-type'>{state.jobs.type}</span>
											<p>{state.jobs.title}</p>
											<p>{state.jobs.location}</p>
											<div className='button'>
												<a href={applynow}>here</a>
											</div>
										</div>
										<div className='Description-botton'>
											{Parser(state.jobs.description)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default JobDeatils;
