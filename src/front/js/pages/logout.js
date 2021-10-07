import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { GlobalState } from "../store/appContext";

import "../../styles/demo.scss";

export const Logout = () => {
	const { store, actions } = useContext(GlobalState);

	return (
		<div className="container d-flex flex-column align-items-center">
			<p className="heading-1">Logged out</p>

			<br />
			<Link to="/">
				<button className="btn btn-style">Back to Home</button>
			</Link>
		</div>
	);
};
