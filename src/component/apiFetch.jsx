export const getJobs = async (
	type = " ",
	fulltime = " ",
	location = " ",
	page = 1
) => {
	const response = await fetch(
		`https://confident-khorana-8491e4.netlify.app/.netlify/functions/api/description=${type}&full_time=${fulltime}&location=${location}&page=${page}`
	);
	console.log(response);
	const data = await response.json();
	return data;
};
