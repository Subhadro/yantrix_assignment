import React from "react";
import {axiosInstance} from "../../lib/axios";
import {Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../../contextapi/authUser";
import toast from "react-hot-toast";

const Home = () => {
	const navigate = useNavigate();
	const {auth, setAuth} = useAuth();

	if (!auth) {
		return <Navigate to="/login" replace />;
	}
	const logout = async () => {
		try {
			await axiosInstance.post("/auth/logout");
			setAuth(false);
			toast.success("Logged out successfully!");
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<div className="min-h-screen flex items-center  bg-gradient-to-br justify-center from-blue-100 to-purple-200">
			<div className="animate-fade-in bg-white p-10 rounded-2xl shadow-lg max-w-md text-center ">
				<h1 className="text-3xl font-bold text-gray-800 mb-4">
					Welcome Home!
				</h1>
				<p className="text-gray-600 mb-6">
					You are successfully logged in. Explore the app.
				</p>
				<button
					onClick={logout}
					className=" transition duration-200 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg "
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Home;
