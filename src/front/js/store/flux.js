const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			contacts: [],
			message: "",
			activeUser: {},
			notes: [],
			apiAddress: "https://3001-sapphire-mule-7vfxj6dr.ws-eu17.gitpod.io/"
			// token: null,
			// noteArray: JSON.parse(localStorage.getItem("notes")) || []
		},
		actions: {
			// deleteNote: noteIndex => {
			// 	const prevNotes = getStore().noteArray;
			// 	const notesNotDeleted = prevNotes.filter((el, i) => {
			// 		return i != noteIndex;
			// 	});
			// 	setStore({ noteArray: notesNotDeleted });
			// 	localStorage.setItem("notes", JSON.stringify(notesNotDeleted));
			// },
			// deleteAllUserNotes: id => {
			// 	const prevNotes = getStore().noteArray;
			// 	const notesNotDeleted = prevNotes.filter(el => {
			// 		return el.userId != id;
			// 	});
			// 	setStore({ noteArray: notesNotDeleted });
			// 	localStorage.setItem("notes", JSON.stringify(notesNotDeleted));
			// },
			// getAllUsers: () => {
			// 	fetch(process.env.BACKEND_URL + "/api/users", opts)
			// 		.then(response => {
			// 			if (!response.ok) {
			// 				throw Error(response.statusText);
			// 			}
			// 			return response.json();
			// 		})
			// 		.then(allUsers => {
			// 			setStore({ allUsers: allUsers });
			// 		})
			// 		.catch(err => console.log("There was a following error: " + err));
			// },
			// saveTokenFromSessionStorage: () => {
			// 	const token = sessionStorage.getItem("token");
			// 	if (token && token != "" && token != undefined) {
			// 		setStore({ token: token });
			// 	}
			// },
			getUserInfo: username => {
				const store = getStore();
				fetch(store.apiAddress + `api/user/${username}`)
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(userData => {
						setStore({ activeUser: userData });
					})
					.catch(err => console.log("There was a following error: " + err));
			},
			logout: () => {
				sessionStorage.removeItem("token");
				setStore({ activeUser: null });
			},
			login: async (username, password) => {
				const store = getStore();
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username: username,
						password: password
					})
				};
				try {
					const resp = await fetch(store.apiAddress + "api/login", opts);
					if (resp.status !== 200) {
						alert("There has been an error.");
						return false;
					}
					const data = await resp.json();
					// console.log("This came from the backend", data);
					sessionStorage.setItem("token", data.token);
					setStore({ activeUser: data.user });
					// console.log("Active user: ", getStore().activeUser);
					// console.log("Active user contacts: ", getStore().activeUser.contacts);
					return true;
				} catch (error) {
					console.error("There has been an error while loging in.");
				}
			},
			signUp: (username, email, password) => {
				const store = getStore();
				fetch(store.apiAddress + "api/user", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						username: username,
						email: email,
						password: password
					})
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						if (response.status == 401) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(respAsJson => {
						// console.log("This is respAsJson from POST:", respAsJson);
						setStore({ activeUser: respAsJson });
					})
					.catch(err => {
						console.log("An error occurred: ", err);
					});
			},
			addContact: (id, name, address, contact_email, phone, text) => {
				const store = getStore();
				fetch(store.apiAddress + `api/user/${id}/addcontact`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: name,
						contact_email: contact_email,
						address: address,
						phone: phone,
						text: text
					})
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						if (response.status == 401) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(respAsJson => {
						// console.log("This is respAsJson from POST:", respAsJson);
						setStore({ contacts: respAsJson });
					})
					.catch(err => {
						console.log("An error occurred: ", err);
					});
			},
			addContactNote: (contact_id, text) => {
				const store = getStore();
				fetch(store.apiAddress + `api/contact/${contact_id}/addnote`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						text: text,
						contact_id: contact_id
					})
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						if (response.status == 401) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(respAsJson => {
						console.log("This is respAsJson from addNOte POST:", respAsJson);
						// console.log("This is contacts from addNote:", store.contacts);
						// setStore({ notes: [...notes, respAsJson] });

						// console.log("added note:", store.notes);
					})
					.catch(err => {
						console.log("An error occurred: ", err);
					});
			},
			getAllContactNotes: contact_id => {
				const store = getStore();
				fetch(store.apiAddress + `api/contact/${contact_id}/notes`)
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(allNotes => {
						// console.log("ALL Notes for GET fetch:", allNotes);
						// setStore({ notes: allNotes });
					})
					.catch(err => console.log("There was a following error: " + err));
			},
			// editFetch: person => {
			// 	fetch("https://assets.breatheco.de/apis/fake/contact/" + person.id, {
			// 		method: "PUT",
			// 		headers: {
			// 			"Content-Type": "application/json"
			// 		},
			// 		body: JSON.stringify({
			// 			full_name: person.full_name,
			// 			email: person.email,
			// 			agenda_slug: "agenda_2025",
			// 			address: person.address,
			// 			phone: person.phone,
			// 			note: person.note
			// 		})
			// 	})
			// 		.then(response => {
			// 			if (!response.ok) {
			// 				throw Error(response.statusText);
			// 			}
			// 			return response.json();
			// 		})
			// 		.then(data => {
			// 			const prevNotes = getStore().noteArray;
			// 			if (person.note != "" && person.note != undefined) {
			// 				setStore({ noteArray: [...prevNotes, { userId: data.id, note: person.note }] });
			// 			}
			// 			const editedNotes = getStore().noteArray;
			// 			console.log("Edited Notes Array", editedNotes);
			// 			localStorage.setItem("notes", JSON.stringify(editedNotes));
			// 			getActions().getFetch();
			// 			// confirm return of data here
			// 		})
			// 		.catch(err => console.log("There was a following error: " + err));
			// },
			greetUser: () => {
				const store = getStore();
				const token = sessionStorage.getItem("token");
				// const opts = {
				// 	headers: {
				// 		Authorization: "Bearer " + token
				// 	}
				// };

				fetch(store.apiAddress + "api/greet", {
					headers: {
						Authorization: "Bearer " + token
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(err => console.log("There has been an error loading message from backend", err));
			},
			deleteNote: (contact_id, id) => {
				const store = getStore();
				fetch(store.apiAddress + `api/contact/${contact_id}/note/${id}`, {
					method: "DELETE"
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						console.log("This is the deleteFetch data: ", data);
						getActions().getUserInfo(store.activeUser["username"]);
						// confirm return of data here
					})
					.catch(err => console.log("There was a following error: " + err));
			}

			//
			// postFetch: contact => {
			// 	fetch("https://assets.breatheco.de/apis/fake/contact/", {
			// 		method: "POST",
			// 		headers: {
			// 			"Content-Type": "application/json"
			// 		},
			// 		body: JSON.stringify({
			// 			full_name: contact.name,
			// 			email: contact.email,
			// 			agenda_slug: "agenda_2025",
			// 			address: contact.address,
			// 			phone: contact.phone,
			// 			note: contact.note
			// 		})
			// 	})
			// 		.then(response => {
			// 			if (!response.ok) {
			// 				throw Error(response.statusText);
			// 			}
			// 			return response.json();
			// 		})
			// 		.then(data => {
			// 			const prevNotes = getStore().noteArray;
			// 			if (contact.note != "" && contact.note != undefined) {
			// 				setStore({ noteArray: [...prevNotes, { userId: data.id, note: contact.note }] });
			// 			}
			// 			const currNotes = getStore().noteArray;
			// 			localStorage.setItem("notes", JSON.stringify(currNotes));
			// 			getActions().getFetch();
			// 			console.log("This is the POST fetch data ", data);
			// 			// confirm return of data here
			// 		})
			// 		.catch(err => console.log("There was a following error: " + err));
			// }
		}
	};
};
export default getState;
