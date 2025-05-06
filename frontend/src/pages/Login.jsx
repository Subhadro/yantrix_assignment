import React, {useState} from "react";
import {axiosInstance} from "../../lib/axios";
import {useAuth} from "../../contextapi/authUser";
import {Navigate, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
	const {auth, setAuth} = useAuth();
	const navigate = useNavigate();

	const [data, setData] = useState({email: "", password: ""});
	const [error, setError] = useState(null);

	const loginDone = async e => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post("/auth/login", data);
			setAuth(response.data);
			toast.success("Logged in successfully!");
			navigate("/");
		} catch (err) {
			console.error("Login failed:", err);
			const msg =
				err?.response?.data?.message || "Invalid email or password.";
			toast.error(msg);
			setError(msg);
		}
	};

	const handleChange = e => {
		setData({...data, [e.target.name]: e.target.value});
	};

	if (auth) {
		return <Navigate to="/" replace />;
	}

	return (
		<div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-amber-100 to-amber-300">
			<div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
				<h2 className="text-3xl font-bold text-amber-800 mb-6 text-center">
					Welcome Back
				</h2>

				<form className="space-y-4" onSubmit={loginDone}>
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

					{error && <p className="text-sm text-red-600">{error}</p>}

					<button
						type="submit"
						className="w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition duration-200"
					>
						Log In
					</button>
				</form>

				<p className="mt-6 text-center text-sm text-amber-600">
					Don't have an account?{" "}
					<a
						href="/signup"
						className="text-amber-800 font-medium hover:underline"
					>
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
};

export default Login;
