import React from "react";
import "./navbar.css";

function Navbar() {
    return(
        <div className="navbar">
            <div className="navbar-cont">
                <div className="links">
                    <a href="#about">About</a>
                    <a href="#projects">Services</a>
                    <a href="#extra">Team</a>
                    <a href="#login">Member Login</a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;