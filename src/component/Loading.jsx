import React from "react";
import "./css/loading.css";

export default function LoadingScreen() {
	return (
		<div>
			<div className='lds-ellipsis'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
