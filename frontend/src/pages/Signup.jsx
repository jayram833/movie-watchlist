import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Signup() {
    const { signup } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSignup(e) {
        e.preventDefault();
        try {
            await signup(formData);
            navigate("/dashboard");
        } catch (err) {
            console.error("Signup failed:", err);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
                    Create an Account
                </h2>
                <form onSubmit={handleSignup} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your full name"
                            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="you@example.com"
                            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            value={formData.password}
                            onChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-1 mt-6 right-0 px-3 flex items-center text-gray-400"
                        >
                            {showPassword
                                ? <EyeSlashIcon className="h-5 w-5" />
                                : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already signed in?{" "}
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
