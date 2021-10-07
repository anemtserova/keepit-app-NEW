import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../store/appContext";
import PropTypes from "prop-types";

export const EditContact = props => {
	const { store, actions } = useContext(GlobalState);
	let contact = store.contacts.find((el, i) => el.id == props.match.params.id);
	const [editedContact, setEditedContact] = useState({
		full_name: contact.full_name,
		email: contact.email,
		address: contact.address,
		phone: contact.phone,
		note: contact.note,
		id: contact.id
	});
	const handleInput = e => {
		setEditedContact({ ...editedContact, [e.target.name]: e.target.value });
	};
	const handleSave = () => {
		actions.editFetch(editedContact);
		props.history.push("/contacts");
		console.log("Edited note", editedContact.note);
	};
	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5 heading-1">Edit contact: {contact.full_name}</h1>
				<form>
					<div className="form-group">
						<label className="heading-3">Full Name</label>
						<input
							onChange={handleInput}
							type="text"
							className="form-control"
							name="full_name"
							placeholder="Full Name"
							value={editedContact.full_name}
						/>
					</div>
					<div className="form-group">
						<label className="heading-3">Email</label>
						<input
							onChange={handleInput}
							type="email"
							className="form-control"
							name="email"
							placeholder="Enter email"
							value={editedContact.email}
						/>
					</div>
					<div className="form-group">
						<label className="heading-3">Phone</label>
						<input
							onChange={handleInput}
							type="phone"
							className="form-control"
							name="phone"
							placeholder="Enter phone"
							value={editedContact.phone}
						/>
					</div>
					<div className="form-group">
						<label className="heading-3">Address</label>
						<input
							onChange={handleInput}
							type="text"
							className="form-control"
							name="address"
							placeholder="Enter address"
							value={editedContact.address}
						/>
					</div>
					<div className="form-group">
						<label className="heading-3">Add a Note (optional)</label>
						<input
							onChange={handleInput}
							type="text"
							className="form-control"
							name="note"
							placeholder="Write a note"
							value={editedContact.note}
						/>
					</div>
					<button onClick={handleSave} type="button" className="btn btn-style form-control">
						Save
					</button>
					<Link className="mt-3 w-100 text-center heading-3" to="/contacts">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

EditContact.propTypes = {
	entity: PropTypes.object,
	match: PropTypes.object,
	history: PropTypes.object
};
