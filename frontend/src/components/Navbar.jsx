import React from "react";
import {useNavigate, useLocation} from "react-router-dom";
import POSLogo from '../assets/images/iTech-Logo-Home.png';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="flex justify-between items-center py-1 px-11 bg-white">
            <h1 className="text-black text-xs text-center font-extrabold leading-7"> <img src={POSLogo} alt="POS-Logo" height="100px" width="100px" className="ml-5 mt-2"/>Complete POS Solution</h1>           
            {/* <h1 className="text-blue-700 text-2xl font-extrabold">Itech-Systems</h1> */}
            <div className="flex items-center">
                <button
                    onClick={() => navigate('/home')}
                    className={`text-blue-700 no-underline text-lg font-medium mx-4 ${location.pathname === '/home' || location.pathname === '/' ? 'text-red-800' : ''}`}
                >
                    Home
                </button>
                <button
                    onClick={() => navigate('/adminPage')}
                    className={`text-blue-700 no-underline text-lg font-medium mx-4  ${location.pathname === '/adminPage' ? 'text-red-800' : ''}`}
                >
                    Admin
                </button>
            </div>
        </div>
    );
    

};

export default Navbar;