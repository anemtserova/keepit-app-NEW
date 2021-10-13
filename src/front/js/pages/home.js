import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { GlobalState } from "../store/appContext";

import "../../styles/demo.scss";

export const Home = () => {
	const { store, actions } = useContext(GlobalState);
	const token = sessionStorage.getItem("token");

	useEffect(
		() => {
			if (token && token != "" && token != undefined) {
				actions.greetUser();
				actions.getFetch();
			}
		},
		[token]
	);

	return (
		<div className="container mb-3">
			{!token ? (
				<div className="d-flex flex-column align-items-center mb-3">
					<p className="heading-1"> Welcome to KeepIt.App</p>
					<p>
						KeepIt.App is an intuitive contact management application that safely stores your contacts at
						one place and provides an easy access whenever you need them.
						<p>Features: </p>
						<p>
							<b>Add a Conatct</b>
						</p>
						<p>
							<b>Edit a contact</b>
						</p>
						<p>
							<b>Delete a Contact</b>
						</p>
						<p>
							<b>Add, edit, and delete multiple notes from/to a contact</b>
						</p>
					</p>
					<span>
						<Link to="/login">
							<button className="btn btn-style ">Log In</button>
						</Link>
						<span> or </span>
						<Link to="/signup">
							<button className="btn btn-style ">Sign up</button>
						</Link>
					</span>
				</div>
			) : (
				<div className="d-flex flex-column align-items-center ">
					<p className="heading-1">{store.message}</p>
					<Link className="heading-3" to="/contacts">
						Go to Your Contacts
					</Link>
					<div>OR</div>
					<Link className="heading-3" to="/add">
						Add a New Contact
					</Link>
				</div>
			)}
		</div>
	);
};
