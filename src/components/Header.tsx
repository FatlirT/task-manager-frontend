import { useState, useRef, useEffect } from "react";
import { useAuth } from "../components/auth/AuthContext";


export default function Header() {

    const { user, logoutUser } = useAuth();


    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-white shadow-md">
            <div className="grid grid-cols-3 text-center items-center h-16 mx-6">
                <div id="header-left" className="flex justify-start">HM</div>
                <h1 id="header-title" className="text-xl font-bold text-gray-800 justify-center flex">Task Manager</h1>
                {user && <div id="header-right" className="relative flex justify-end" ref={dropdownRef}>
                    <button
                        onClick={() => setMenuOpen(prev => !prev)}
                        className="text-black px-3 py-2 rounded hover:text-black/45 transition flex items-center"
                    >
                        {`${user.first_name} ${user.last_name}`}
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
                            <button
                                onClick={logoutUser}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                </div>}
            </div>
        </header>
    );
}
