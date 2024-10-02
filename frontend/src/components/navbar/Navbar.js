import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between">
                <Link to="/participants" className="text-lg font-bold">Participants</Link>
                <Link to="/calendars" className="text-lg font-bold">Calendars</Link>
            </div>
        </nav>
    );
};

export default Navbar;
