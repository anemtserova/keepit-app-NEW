const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			contacts: [],
			message: "",
			activeUser: {},
			notes: []
		},
		actions: {
			getUserInfo: username => {
				const store = getStore();
				const loggedUser = JSON.parse(localStorage.getItem("loggedUserUsername"));
				fetch(process.env.BACKEND_URL + `/api/user/${loggedUser}`)
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
				localStorage.removeItem("loggedUserUsername");
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
					const resp = await fetch(process.env.BACKEND_URL + "/api/login", opts);
					if (resp.status !== 200) {
						alert("There has been an error.");
						return false;
					}
					const data = await resp.json();
					console.log("LOGIN: This came from the backend", data);
					sessionStorage.setItem("token", data.token);
					setStore({ activeUser: data.user });
					localStorage.setItem("loggedUserUsername", JSON.stringify(data.user.username));

					return true;
				} catch (error) {
					console.error("There has been an error while loging in.");
				}
			},
			signUp: (username, email, password) => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "/api/user", {
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
			addContact: (id, name, contact_email, phone, address, text) => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + `/api/user/${id}/addcontact`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: name,
						contact_email: contact_email,
						phone: phone,
						address: address,
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
						console.log("array of contacts:", store.contacts);
						getActions().getUserInfo(store.activeUser["username"]);
					})
					.catch(err => {
						console.log("An error occurred: ", err);
					});
			},
			editContact: (user_id, id, name, contact_email, phone, address) => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + `/api/user/${user_id}/contact/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						name: name,
						contact_email: contact_email,
						phone: phone,
						address: address
					})
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						console.log("EDITCONTACT: data from edit fetch", data);
						getActions().getUserInfo(store.activeUser["username"]);
					})
					.catch(err => console.log("There was a following error: " + err));
			},
			deleteContact: (user_id, id) => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + `/api/user/${user_id}/contact/${id}`, {
					method: "DELETE"
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						getActions().getUserInfo(store.activeUser["username"]);
						// confirm return of data here
					})
					.catch(err => console.log("There was a following error: " + err));
			},
			addContactNote: (contact_id, text) => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + `/api/contact/${contact_id}/addnote`, {
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
						getActions().getUserInfo(store.activeUser["username"]);
					})
					.catch(err => {
						console.log("An error occurred: ", err);
					});
			},
			getAllContactNotes: contact_id => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + `/api/contact/${contact_id}/notes`)
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(allNotes => {})
					.catch(err => console.log("There was a following error: " + err));
			},

			greetUser: () => {
				const store = getStore();
				const token = sessionStorage.getItem("token");

				fetch(process.env.BACKEND_URL + "/api/greet", {
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
				fetch(process.env.BACKEND_URL + `/api/contact/${contact_id}/note/${id}`, {
					method: "DELETE"
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						getActions().getUserInfo(store.activeUser["username"]);
						// confirm return of data here
					})
					.catch(err => console.log("There was a following error: " + err));
			}
		}
	};
};
export default getState;
