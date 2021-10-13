import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { GlobalState } from "../store/appContext";

export const SignUp = () => {
	const { store, actions } = useContext(GlobalState);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const token = sessionStorage.getItem("token");
	const history = useHistory();

	const handleSignUp = () => {
		actions.login(username, password).then(() => {
			history.push("/");
		});
	};

	return (
		<div className="container d-flex flex-column align-items-center ">
			<div className="d-flex justify-content-center w-25">
				<h1 className="heading-1">New User Sign-up</h1>
			</div>
			{/* {token && token != "" && token != undefined ? (
				<>
					<h2>You are logged in with token</h2>
					<h4 className="w-50">{username}</h4>
				</>
			) : ( */}
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
				<button onClick={handleLogin} type="submit" className="m-1 btn btn-style">
					Login
				</button>
			</div>
			{/* )} */}
		</div>
	);
};
