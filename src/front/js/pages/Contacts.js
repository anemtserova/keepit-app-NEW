import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../store/appContext";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

export const Contacts = () => {
	const { store, actions } = useContext(GlobalState);
	const token = sessionStorage.getItem("token");
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
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.activeUser.contacts && token
							? store.activeUser.contacts.map((contact, i) => (
									<ContactCard
										key={i}
										entity={contact}
										onDelete={() => {
											stateSetter(contact.id);
										}}
									/>
							  ))
							: "You have no contacts yet."}
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} id={state.id} onClose={setModal} />
		</div>
	);
};
