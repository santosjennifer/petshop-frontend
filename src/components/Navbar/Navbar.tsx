import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="brand isActive = false"><span>Pet</span> Shop</Link>
            <ul className="links_list">
                <li><NavLink to="/" >Home</NavLink></li>
                <li><NavLink to="/pet" >Pet</NavLink></li>
                <li><NavLink to="/person">Tutor</NavLink></li>
                <li><NavLink to="/about" >Sobre</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;
