import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GlobalState } from "../store/appContext";

export const AddNote = () => {
    const { store, actions } = useContext(GlobalState);
	const history = useHistory();
}