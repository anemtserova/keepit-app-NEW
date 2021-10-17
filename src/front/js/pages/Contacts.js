import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../store/appContext";
import PropTypes from "prop-types";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

export const Contacts = props => {
	const { store, actions } = useContext(GlobalState);
	const token = sessionStorage.getItem("token");
	// const [searchName, setSearchName] = useState(null);
	// const [searchResults, setSearchResults] = useState([]);

	// let results = [];

	// const getSearchInput = e => {
	// 	setSearchName(e.target.value);
	// 	console.log("searched Name", searchName);
	// 	return searchName;
	// };

	// const findAContact = () => {
	// 	console.log("searchName", searchName);
	// 	searchName
	// 		? (results = store.activeUser.contacts.filter(el => {
	// 				// el.name.toLowerCase().startsWith(searchName.toLowerCase()) ||
	// 				// 	el.name.toLowerCase().includes(searchName.toLowerCase());
	// 				return el.name == searchName;
	// 		  }))
	// 		: (results = []);
	// 	setSearchResults(results);
	// 	console.log("FOUND contacts", searchResults);
	// 	console.log("Active user contacts", store.activeUser.contacts);
	// 	return searchResults;
	// <ContactCard
	// 	entity={foundContacts}
	// 	// notes={foundContact["notes"]}
	// 	onDelete={() => {
	// 		stateSetter(foundContacts["id"]);
	// 	}}
	// />;
	//};

	const [state, setState] = useState({
		showModal: false,
		id: "0"
	});
	const stateSetter = contactId => {
		setState({ showModal: true, id: contactId });
	};

	const setModal = () => {
		setState({ showModal: false });
	};

	return (
		<div className="container">
			<div className=" d-flex flex-column">
				<p className="d-flex justify-content-end my-3">
					<Link className="btn btn-style " to="/add">
						Add a new contact
					</Link>
				</p>
				{/* <div className="input-group mb-3">
					<input
						type="text"
						value={searchName}
						onChange={getSearchInput}
						className="form-control"
						placeholder="Search for a name..."
						aria-label="Search for a name..."
						aria-describedby="button-addon2"
					/>
					<div className="input-group-append">
						<button onClick={findAContact} className="btn btn-style" type="button" id="button-addon2">
							<i className="fas fa-search" />
						</button>
					</div>
				</div> */}
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.activeUser.contacts && token && store.activeUser.contacts.length > 0 ? (
							store.activeUser.contacts.map((contact, i) => (
								<ContactCard
									key={i}
									entity={contact}
									notes={contact.notes}
									noteLst={contact.notes.length}
									onDelete={() => {
										stateSetter(contact.id);
									}}
								/>
							))
						) : (
							<div className="heading-3 text-center">You have no contacts to show.</div>
						)}
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} id={state.id} onClose={setModal} />
		</div>
	);
};

Contacts.propTypes = {
	// history: PropTypes.object,
	// onDelete: PropTypes.func,
	// entity: PropTypes.object,
	// notes: PropTypes.array
	//noteList: PropTypes.number
};
