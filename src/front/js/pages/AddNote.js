import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GlobalState } from "../store/appContext";
import PropTypes from "prop-types";

export const AddNote = props => {
	const { store, actions } = useContext(GlobalState);
	const history = useHistory();

	const [note, setNote] = useState({
		text: null
	});

	const handleInput = e => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	const handleSave = () => {
		console.log("PROPS.ENTITY.ID", props.entity.id);
		actions.addContactNote(props.entity.id, note.text);

		// props.history.push("/contacts");
		history.push("/contacts");
		console.log("This is the store.activeUser contact notes ", store.activeUser.contacts.notes);
	};
	return (
		<div className="container">
			<div>
				<p className="text-center mt-5 heading-1">Add a Note</p>
				<form>
					<div className="form-group">
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

AddNote.propTypes = {
	history: PropTypes.object,
	match: PropTypes.object,
	entity: PropTypes.object
};
