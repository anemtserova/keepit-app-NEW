import React, { useState, useEffect, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { GlobalState } from "../store/appContext";

import PropTypes from "prop-types";

export const SignUp = props => {
	const { store, actions } = useContext(GlobalState);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	// const [newUser, setNewUser] = useState({
	// 	username: "",
	// 	email: "",
	// 	password: ""
	// });
	const token = sessionStorage.getItem("token");
	const history = useHistory();

	const handleSignUp = () => {
		console.log();
		actions.signUp(username, email, password);
		history.push("/login");
		// return <Redirect to="/login" />;
	};

	return (
		<div className="container d-flex flex-column align-items-center ">
			<div className="d-flex justify-content-center w-75">
				<h1 className="heading-1">New User Sign-up</h1>
			</div>

			<div className="d-flex flex-column justify-content-center w-25">
				<input
					type="text"
					placeholder="username"
					value={username}
					onChange={e => setUsername(e.target.value)}
					className="m-1"
				/>
				<input
					type="email"
					placeholder="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					className="m-1"
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					className="m-1"
				/>
				<button onClick={handleSignUp} type="submit" className="m-1 btn btn-style">
					Sign Up
				</button>
			</div>
			{/* )} */}
		</div>
	);
};

SignUp.propTypes = {
	history: PropTypes.object
	// match: PropTypes.object
};
