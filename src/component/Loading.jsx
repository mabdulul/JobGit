import React from "react";
import "./css/loading.css";

export default function LoadingScreen() {
	return (
		<div className="' justify-content-center">
			<div class='lds-ellipsis'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
