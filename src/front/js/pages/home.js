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
				//console.log(store.message);
				// actions.getFetch();
				actions.getUserInfo(store.activeUser["username"]);
			}
		},
		[token]
	);

	return (
		<div className="container mb-3 d-flex justify-content-center">
			{!token ? (
				<div className="d-flex flex-column align-items-center mb-3 w-75">
					<p className="heading-1"> Welcome to KeepIt.App</p>
					<div className="d-flex flex-column align-items-center justify-content-center">
						<div className="d-flex">
							<p className="home-text">
								<span className="heading-3">KeepIt.App</span> is an easy-to-use contact management
								application that safely stores your contacts at one place and provides an easy access
								whenever you need them through its simple and enjoyable user inteface.
							</p>
						</div>
						<div className="d-flex flex-column align-items-center justify-content-center">
							<p className="heading-3 mt-2 mb-0">Features:</p>
							<div className="d-flex">
								<p className="my-2">
									<i className="far fa-plus-square color1" /> <b>Add a Conatct</b>
								</p>
							</div>
							<p className="my-2">
								<i className="far fa-edit color1" /> <b>Edit a contact</b>
							</p>
							<p className="my-2">
								<i className="fas fa-trash-alt color1" /> <b>Delete a Contact</b>
							</p>
							<p className="d-flex flex-column align-items-center justify-content-center mt-2 mb-4 pb-3">
								<div>
									<i className="far fa-sticky-note color1" /> <b>Notes: </b>
								</div>
								<b>Add multiple notes to a contact</b>
								<b>Delete notes</b>
							</p>
						</div>
					</div>
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
