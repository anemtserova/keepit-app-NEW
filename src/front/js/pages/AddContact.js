import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GlobalState } from "../store/appContext";
import PropTypes from "prop-types";

export const AddContact = () => {
	const { store, actions } = useContext(GlobalState);
	const history = useHistory();

	const [contact, setContact] = useState({
		name: null,
		contact_email: null,
		address: null,
		phone: null,
		text: null
	});

	const handleInput = e => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};

	const handleSave = () => {
		actions.addContact(
			store.activeUser.id,
			contact.name,
			contact.contact_email,
			contact.phone,
			contact.address,
			contact.text
		);

		history.push("/contacts");
	};
	return (
		<div className="container">
			<div>
				<p className="text-center mt-5 heading-1">Add a new contact</p>
				<form>
					<div className="form-group">
						<label className="heading-3">Full Name</label>
						<input
							onChange={handleInput}
							type="text"
							className="form-control "
							name="name"
							placeholder="Enter full Name"
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
						/>
					</div>
					<div className="form-group">
						<label className="heading-3">Phone</label>
						<input
							onChange={handleInput}
							type="phone"
							className="form-control"
							name="phone"
							placeholder="Enter phone number"
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
						/>
					</div>
					<div className="">
						<Link to="/addnote" />
					</div>
					<div className="form-group ">
						<label className="heading-3">Add a Note (optional)</label>
						<input
							onChange={handleInput}
							type="text"
							className="form-control"
							name="text"
							placeholder="Write a note"
						/>
					</div>
					<button onClick={() => handleSave()} type="button" className="btn btn-style form-control mt-3">
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

AddContact.propTypes = {
	history: PropTypes.object,
	match: PropTypes.object
};
