import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../store/appContext";
import PropTypes from "prop-types";

export const EditContact = props => {
	const { store, actions } = useContext(GlobalState);
	let contact = store.activeUser["contacts"].find((el, i) => el.id == props.match.params.id);
	const [editedContact, setEditedContact] = useState({
		name: contact.name,
		contact_email: contact.contact_email,
		address: contact.address,
		phone: contact.phone
	});
	const handleInput = e => {
		setEditedContact({ ...editedContact, [e.target.name]: e.target.value });
	};
	const handleSave = () => {
		actions.editContact(
			store.activeUser.id,
			contact.id,
			editedContact.name,
			editedContact.contact_email,
			editedContact.phone,
			editedContact.address
		);
		props.history.push("/contacts");
		//console.log("Edited note", editedContact.note);
	};
	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5 heading-1">Edit contact: {contact.name}</h1>
				<form>
					<div className="form-group">
						<label className="heading-3">Full Name</label>
						<input
							onChange={handleInput}
							type="text"
							className="form-control"
							name="name"
							placeholder="Full Name"
							value={editedContact.name}
						/>
					</div>
					<div className="form-group">
						<label className="heading-3">Email</label>
						<input
							onChange={handleInput}
							type="email"
							className="form-control"
							name="contact_email"
							placeholder="Enter email"
							value={editedContact.contact_email}
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
					{/* <div className="form-group">
						<label className="heading-3">Add a Note (optional)</label>
						<input
							onChange={handleInput}
							type="text"
							className="form-control"
							name="note"
							placeholder="Write a note"
							value={editedContact.note}
						/>
					</div> */}
					<button onClick={handleSave} type="button" className="btn btn-style form-control mt-3">
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
