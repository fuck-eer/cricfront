import React from "react";

const FullPageLayout = ({ title, children }) => {
	return (
		<div
			style={{
				padding: "0px",
				width: "100vw",
				height: "90vh",
				marginTop: "10vh",
			}}
		>
			<h1 style={{ textAlign: "center" }}>{title}</h1>
			{children}
		</div>
	);
};

export default FullPageLayout;
