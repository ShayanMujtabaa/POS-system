import React from "react";
import {useNavigate, useLocation} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="flex justify-between items-center py-4 px-12 bg-[#18191E]">
            <h1 className="text-white text-4xl font-extrabold">Itech-Systems</h1>
            <div className="flex items-center">
                <button
                    onClick={() => navigate('/home')}
                    className={`text-white text-lg font-medium mx-4 ${location.pathname === '/home' ? 'underline' : ''}`}
                >
                    Home
                </button>
                <button
                    onClick={() => navigate('/adminPage')}
                    className={`text-white text-lg font-medium mx-4 ${location.pathname === '/adminPage' ? 'underline' : ''}`}
                >
                    Admin
                </button>
            </div>
        </div>
    );
    

};

export default Navbar;