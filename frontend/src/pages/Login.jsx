import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleLogin(e) {
        e.preventDefault();
        console.log(formData);
        const user = await login(formData.email, formData.password);
        console.log(user);
        setFormData({
            email: "",
            password: ""
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
                    Login
                </h2>
                <form onSubmit={handleLogin} className="space-y-5">

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="you@example.com"
                            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-none sm:text-sm focus:outline-none"
                        />
                    </div>

                    <div className="relative">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            value={formData.password}
                            onChange={handleChange}
                            type={showPassword ? "password" : "text"}
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-none sm:text-sm focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="cursor-pointer absolute inset-y-1 mt-6 right-0 px-3 flex items-center text-gray-400"
                        >
                            {showPassword ?
                                <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className=" cursor-pointer w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Not signed in?{" "}
                    <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Signup</Link>
                </p>
            </div>
        </div>
    );
}
export default Login;
