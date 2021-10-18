import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import RetroPhonePhoto from "../../img/contacts.png";
import { Link } from "react-router-dom";
import { GlobalState } from "../store/appContext";

export const ContactCard = props => {
	const { store, actions } = useContext(GlobalState);
	const noteState = {
		text: "",
		contact_id: null
	};
	const [note, setNote] = useState(noteState);

	// const [noteArray, setNoteArray] = useState([]);

	const handleNoteInput = e => {
		setNote({ [e.target.name]: e.target.value });
	};

	const postANote = () => {
		note.contact_id = props.entity.id;
		// actions.getUserInfo(store.activeUser.username);

		actions.addContactNote(note.contact_id, note.text);

		//document.getElementById("note-text").value = "";
		setNote(noteState);
	};

	const includeNote = () => {
		const userNote = props.notes.filter((el, i) => el.contact_id == props.entity.id);
		return userNote && userNote.text;
	};

	const displayNote = (noteToDisplay, i) => {
		if (noteToDisplay.text && noteToDisplay.text != "" && noteToDisplay.contact_id == props.entity.id) {
			return (
				<div className="d-flex justify-content-between w-100 mb-2" key={i}>
					<div className=" d-flex align-items-center justify-content-center btn">
						<i className="fas fa-chevron-right color1" />
					</div>
					<div className="d-flex align-self-center text-muted note-script">{noteToDisplay.text}</div>
					<div className="d-flex align-items-center justify-content-end">
						{/* <div className=" d-flex align-items-center justify-content-center btn">
							<i onClick={() => actions.deleteNote(i)} className="far fa-edit color1" />
						</div> */}
						<div className="item1-color d-flex align-items-center justify-content-center btn mx-4">
							<i
								onClick={() => {
									actions.deleteNote(noteToDisplay.contact_id, noteToDisplay.id);
								}}
								className="fas fa-trash-alt"
							/>
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
				<div className="d-flex justify-content-center align-items-center w-25">
					<img
						src={RetroPhonePhoto}
						alt="Retro phone image"
						className="align-self-center justify-content-center"
						style={{ maxWidth: "100%", maxHeight: "100%" }}
					/>
				</div>
				<div className="d-flex flex-column w-75 py-2 pl-4 m-3 info-box">
					<div className="d-flex flex-row justify-content-end">
						<div className="mx-3">
							<Link className="" to={"/edit/" + props.entity.id}>
								<button className="btn item2-color w-100  ">
									<i className="fas fa-pencil-alt w-100 " />
								</button>
							</Link>
						</div>
						<div className="">
							<button
								className="btn item1-color h-100 w-100"
								onClick={() => {
									props.onDelete();
									actions.getUserInfo(store.activeUser["username"]);
								}}>
								<i className="fas fa-trash-alt " />
							</button>
						</div>
					</div>

					<h2 className="name heading-1">{props.entity.name}</h2>
					<div className="d-flex flex-row mb-2">
						<i className="fas fa-home text-muted mx-3 mb-2 align-self-center" />
						<p className="text-muted">{props.entity.address}</p>
					</div>
					<div className="d-flex flex-row mb-2">
						<i className="fa fa-phone fa-fw text-muted mx-3 mb-2 align-self-center" />
						<p className="text-muted">{props.entity.phone}</p>
					</div>
					<div className="d-flex flex-row mb-2">
						<i className="fa fa-at fa-fw text-muted mx-3 mb-2 align-self-center" />
						<p className="text-muted text-truncate">{props.entity.contact_email}</p>
					</div>

					<div className="d-flex flex-column mb-2">
						<label className="heading-3">Notes</label>
						<div className="d-flex flex-row mb-2">
							<div className="w-100">
								<input
									onChange={handleNoteInput}
									type="text"
									value={note.text}
									className="form-control"
									name="text"
									id="note-text"
									placeholder="Write a
								note"
								/>
							</div>
							<button
								onClick={() => {
									postANote();
								}}
								className="btn btn-style-small mx-2">
								Add Note
							</button>
						</div>
					</div>

					<div className="d-flex flex-row mb-2">
						{/* <i className="fas fa-pen-alt text-muted mx-3 mb-2 align-self-center" /> */}
						<div className="text-muted w-100">
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
