import React from "react";

export default function JobsPagination({ LoadMore }) {
	return (
		<div>
			<button className="btn" onClick={LoadMore}>
				Load More
			</button>
		</div>
	);
}
