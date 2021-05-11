export const getJobs = async (
	type = " ",
	fulltime = " ",
	location = " ",
	page = 1
) => {
	const response = await fetch(
		`https://confident-khorana-8491e4.netlify.app/.netlify/functions/api/test/description=${type}&full_time=${fulltime}&location=${location}&page=${page}`
	).catch((err) => {
		"Something went wrong try reloading";
	});

	const data = await response.json();
	return data;
};

export const getJobDetails = async (url) => {
	const response = await fetch(
		`https://confident-khorana-8491e4.netlify.app/.netlify/functions/api/details/${url}`
	);

	const data = await response.json();

	return data;
};
