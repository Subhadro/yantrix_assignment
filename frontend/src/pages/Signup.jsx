import React, {useState} from "react";
import {axiosInstance} from "../../lib/axios";
import {useAuth} from "../../contextapi/authUser";
import {Navigate} from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
	const {auth, setAuth} = useAuth();
	const [data, setData] = useState({name: "", email: "", password: ""});
	const [error, setError] = useState(null);

	const signupDone = async e => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post("/auth/signup", data);
			setAuth(response.data);
			if (auth) {
				return <Navigate to="/" replace />;
			}
		} catch (err) {
			console.error("Signup failed:", err);
			toast.error("check your email and password and try again.");
			setError("Could not register. Please try again.");
		}
	};
	if (auth) {
		return <Navigate to="/" replace />;
	}

	const handleChange = e => {
		setData({...data, [e.target.name]: e.target.value});
	};

	return (
		!auth && (
			<div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-amber-100 to-amber-300">
				<div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
					<h2 className="text-3xl font-bold text-amber-800 mb-6 text-center">
						Create Account
					</h2>

					<form className="space-y-4" onSubmit={signupDone}>
						<div>
							<label className="block text-sm font-medium text-amber-700">
								Name
							</label>
							<input
								name="name"
								type="text"
								value={data.name}
								onChange={handleChange}
								placeholder="Your name"
								className="w-full px-4 py-2 mt-1 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-amber-700">
								Email
							</label>
							<input
								name="email"
								type="email"
								value={data.email}
								onChange={handleChange}
								placeholder="you@example.com"
								className="w-full px-4 py-2 mt-1 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-amber-700">
								Password
							</label>
							<input
								name="password"
								type="password"
								value={data.password}
								onChange={handleChange}
								placeholder="••••••••"
								className="w-full px-4 py-2 mt-1 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
								required
							/>
						</div>

						{error && (
							<p className="text-sm text-red-600">{error}</p>
						)}

						<button
							type="submit"
							className="w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition duration-200"
							onClick={() => <Navigate to="/signup" />}
						>
							Sign Up
						</button>
					</form>

					<p className="mt-6 text-center text-sm text-amber-600">
						Already have an account?{" "}
						<a
							href="/login"
							className="text-amber-800 font-medium hover:underline"
						>
							Log in
						</a>
					</p>
				</div>
			</div>
		)
	);
};

export default Signup;
