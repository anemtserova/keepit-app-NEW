import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { GlobalState } from "../store/appContext";

import "../../styles/demo.scss";

export const Home = () => {
	const { store, actions } = useContext(GlobalState);

	useEffect(
		() => {
			if (store.token && store.token != "" && store.token != undefined) {
				actions.greetUser();
				actions.getFetch();
			}
		},
		[store.token]
	);

	return (
		<div className="container mb-3">
			{!store.token ? (
				<div className="d-flex flex-column align-items-center mb-3">
					<p className="heading-1"> Welcome to KeepIt.App</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Nec feugiat nisl pretium fusce id velit ut. Risus quis varius
						quam quisque id diam vel quam. Amet nisl suscipit adipiscing bibendum est ultricies integer
						quis. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Suscipit tellus mauris a
						diam. Suspendisse potenti nullam ac tortor vitae. Sodales ut eu sem integer vitae justo. Arcu ac
						tortor dignissim convallis aenean et. A arcu cursus vitae congue mauris rhoncus aenean vel. Eu
						nisl nunc mi ipsum. Rhoncus dolor purus non enim praesent elementum facilisis leo.
					</p>
					<Link to="/login">
						<button className="btn btn-style ">Log In Here</button>
					</Link>
				</div>
			) : (
				<div className="d-flex flex-column align-items-center ">
					<p className="heading-1">{store.message}</p>
					<Link className="heading-3" to="/contacts">
						Go to Your Contacts
					</Link>
				</div>
			)}
		</div>
	);
};
