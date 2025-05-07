import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../auth/login";
import { useAuth } from "../components/auth/AuthContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const { user, loginUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    if (user) {
        return <Navigate to="/tasks" replace />;
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        try {
            const user = await login(email, password);
            loginUser(user);
            navigate("/tasks", { replace: true });
        } catch {
            setError("Invalid email or password");
        }
    }

    return (
        <div className="">
            <main
                className="max-w-md mx-auto pt-8 px-4"
                id="main-content"
            >
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h1>

                {error && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
                        role="alert"
                        aria-labelledby="error-summary-title"
                        tabIndex={-1}
                    >
                        <strong id="error-summary-title" className="font-semibold block mb-1">
                            There is a problem
                        </strong>
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            autoComplete="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                    >
                        Sign in
                    </button>
                </form>
            </main>
        </div>
    );
}
