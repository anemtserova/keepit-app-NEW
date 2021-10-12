import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Logout } from "./pages/logout";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { AddContact } from "./pages/AddContact.js";
import { Contacts } from "./pages/Contacts.js";
import { EditContact } from "./pages/EditContact.js";
import { Login } from "./pages/login.js";
import { Home } from "./pages/home.js";

import { Navbar } from "./component/navbar.js";
import { Footer } from "./component/footer.js";
import { Modal } from "./component/Modal";
import { ContactCard } from "./component/ContactCard";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";
	const [loggedIn, setLoggedIn] = useState(false);

	return (
		<div className="h-100 ">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar loggedIn = {loggedIn} setLoggedIn={setLoggedIn}/>
					<Switch>
						<Route exact path="/index.html" component={Contacts} />
						{/* <Route exact path="/" component={Contacts} /> */}
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/add" component={AddContact} />
						<Route exact path="/edit/:id" component={EditContact} />
						<Route exact path="/" component={Home} />
						<Route exact path="/logout" component={Logout} />

						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/contacts">
							<Contacts />
						</Route>
						<Route exact path="/logout">
							<Logout />
						</Route>
						<Route exact path="/edit/:id">
							<EditContact />
						</Route>
						<Route exact path="/add">
							<AddContact />
						</Route>
						{/* <Route exact path="/single/:theid">
							<Single />
						</Route> */}
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
