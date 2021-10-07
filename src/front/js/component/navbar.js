import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { GlobalState } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(GlobalState);
	const history = useHistory();

	return (
		<nav className="navbar-style d-flex justify-content-between align-items-center mb-3">
			<div className="navbar-logo mx-4">KeepIt.App</div>

			<div className="mx-4">
				{!store.token ? (
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
