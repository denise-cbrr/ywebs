import React from "react";
import "./navbar.css";

function Navbar() {
    return(
        <div className="navbar">
            <div className="navbar-cont">
                <div className="logo">
                    <h1>ywebs</h1>
                </div>
                <div className="links">
                    <a href="#hero">Home</a>
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#extra">Team</a>
                    <a href="#login">Member Login</a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;