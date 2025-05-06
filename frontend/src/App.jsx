import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import {AuthContextProvider} from "../contextapi/authUser";
import Home from "./pages/Home";
import {Toaster} from "react-hot-toast";
const App = () => {
	return (
		<AuthContextProvider>
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</Router>
			<Toaster position="top-center" />
		</AuthContextProvider>
	);
};

export default App;
