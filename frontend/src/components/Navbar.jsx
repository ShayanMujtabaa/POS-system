import React from "react";
import {useNavigate, useLocation} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="flex justify-between items-center py-2 px-6 bg-white">
            <h1 className="text-blue-700 text-2xl font-extrabold">Itech-Systems</h1>
            <div className="flex items-center">
                <button
                    onClick={() => navigate('/home')}
                    className={`text-blue-700 focus:text-red-800 no-underline text-base font-medium mx-4 ${location.pathname === '/home' || location.pathname === '/' ? 'underline' : ''}`}
                >
                    Home
                </button>
                <button
                    onClick={() => navigate('/adminPage')}
                    className={`text-blue-700 focus:text-red-800 no-underline text-base font-medium mx-4  ${location.pathname === '/adminPage' ? 'underline' : ''}`}
                >
                    Admin
                </button>
            </div>
        </div>
    );
    

};

export default Navbar;