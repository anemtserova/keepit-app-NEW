import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { GlobalState } from "../store/appContext";

export const Navbar = props => {
	const { store, actions } = useContext(GlobalState);
	const history = useHistory();
	const token = sessionStorage.getItem("token");

	return (
		<nav className="navbar-style d-flex justify-content-between align-items-center mb-3">
			{/* {props.loggedIn ? ""  : <Redirect to="/login"/>} */}
			<div className="navbar-logo mx-4">KeepIt.App</div>

			<div className="mx-4">
				{!token ? (
					<div className="">
						<Link to="/login">
							<button className="btn btn-style">Log In</button>
						</Link>
					</div>
				) : (
					<button
						className="btn btn-style"
						onClick={() => {
							actions.logout();
							history.push("/logout");
						}}>
						Log Out
					</button>
				)}
			</div>
		</nav>
	);
};

Navbar.propTypes = {
	loggedIn: PropTypes.bool,
	setLoggedIn: PropTypes.func
};
