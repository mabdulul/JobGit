export const getJobs = async (
	type = " ",
	fulltime = " ",
	location = " ",
	page = 1
) => {
	const response = await fetch(
		`https://confident-khorana-8491e4.netlify.app/.netlify/functions/api/test/description=${type}&full_time=${fulltime}&location=${location}&page=${page}`
	);

	const data = await response.json();
	return data;
};

export const getJobDetails = async (url) => {
	console.log("the id", url);
	const response = await fetch(
		`https://confident-khorana-8491e4.netlify.app/.netlify/functions/api/details/${url}`
	);

	
	const data = await response.json();
	console.log("hello", data)
	return data;
};
