import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import RetroPhonePhoto from "../../img/retro-phone.jpg";
import { Link } from "react-router-dom";
import { GlobalState } from "../store/appContext";

export const ContactCard = props => {
	const { store, actions } = useContext(GlobalState);
	const [note, setNote] = useState({
		text: "",
		contact_id: null
	});

	// const [noteArray, setNoteArray] = useState([]);

	const handleNoteInput = e => {
		setNote({ [e.target.name]: e.target.value });
	};

	const postANote = () => {
		// this is the POST fetch
		note.contact_id = props.entity.id;
		actions.getUserInfo(store.activeUser.username);
		// console.log("Active user data before fetch", store.activeUser);
		actions.addContactNote(note.contact_id, note.text);
		actions.getUserInfo(store.activeUser.username);
	};

	const includeNote = () => {
		const userNote = props.notes.filter((el, i) => el.contact_id == props.entity.id);

		console.log("userNote from includeNote() ", userNote);
		console.log("whole props.notes ", props.notes);
		return userNote && userNote.text;
	};

	const displayNote = (noteToDisplay, i) => {
		if (noteToDisplay.text && noteToDisplay.text != "" && noteToDisplay.contact_id == props.entity.id) {
			return (
				<div className="d-flex justify-content-between w-100 mb-2" key={i}>
					<i className="far fa-dot-circle text-muted mx-3 mb-2 align-self-center" />
					<div className="text-muted note-script">{noteToDisplay.text}</div>
					<div className="d-flex align-items-center justify-content-end">
						<div className=" d-flex align-items-center justify-content-center btn">
							<i onClick={() => actions.deleteNote(i)} className="far fa-edit" />
						</div>
						<div className="item1-color d-flex align-items-center justify-content-center btn">
							<i onClick={() => actions.deleteNote(i)} className="fas fa-trash-alt" />
						</div>
					</div>
				</div>
			);
			{
			}
		}
	};

	return (
		<li className="list-group-item my-2 card-style">
			<div className="d-flex flex-row w-100 ">
				<div className="d-flex justify-content-center align-items-center w-50">
					<img
						src={RetroPhonePhoto}
						alt="Retro phone image"
						className="align-self-center justify-content-center"
						style={{ maxWidth: "75%", maxHeight: "100%" }}
					/>
				</div>
				<div className="d-flex flex-column w-50 py-2 pl-4 m-3 info-box">
					<div className="d-flex flex-row justify-content-end">
						<div className="mx-3">
							<Link className="" to={"/edit/" + props.entity.id}>
								<button className="btn item2-color w-100  ">
									<i className="fas fa-pencil-alt w-100 " />
								</button>
							</Link>
						</div>
						<div className="">
							<button className="btn item1-color h-100 w-100" onClick={() => props.onDelete()}>
								<i className="fas fa-trash-alt " />
							</button>
						</div>
					</div>
					<h2 className="name heading-1">{props.entity.name}</h2>
					<div className="d-flex flex-row mb-2">
						<i className="fas fa-map-marker-alt text-muted mx-3 mb-2 align-self-center" />
						<p className="text-muted">{props.entity.address}</p>
					</div>
					<div className="d-flex flex-row mb-2">
						<i className="fa fa-phone fa-fw text-muted mx-3 mb-2 align-self-center" />
						<p className="text-muted">{props.entity.phone}</p>
					</div>
					<div className="d-flex flex-row mb-2">
						<i className="fa fa-envelope fa-fw text-muted mx-3 mb-2 align-self-center" />
						<p className="text-muted text-truncate">{props.entity.contact_email}</p>
					</div>

					<div className="d-flex flex-column mb-2">
						<label className="heading-3">Notes</label>
						<div className="d-flex flex-row mb-2">
							<input
								onChange={handleNoteInput}
								type="text"
								className="form-control"
								name="text"
								placeholder="Write a note"
							/>
							<button onClick={postANote} className="btn btn-style-small mx-2">
								Add Note
							</button>
						</div>
					</div>

					<div className="d-flex flex-row mb-2">
						{/* <i className="fas fa-pen-alt text-muted mx-3 mb-2 align-self-center" /> */}
						<div className="text-muted w-75">
							{includeNote()}
							{props.notes && props.notes.map((el, i) => displayNote(el, i))}
						</div>
					</div>
				</div>
			</div>
		</li>
	);
};

/**
 * Define the data-types for
 * your component's properties
 **/
ContactCard.propTypes = {
	history: PropTypes.object,
	onDelete: PropTypes.func,
	entity: PropTypes.object,
	notes: PropTypes.array
};

/**
 * Define the default values for
 * your component's properties
 **/
ContactCard.defaultProps = {
	onDelete: null
};
