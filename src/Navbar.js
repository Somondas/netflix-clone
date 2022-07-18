import React, {useState, useEffect } from 'react';
import "./Navbar.css";

const Navbar = () => {
    const [show, handleShow] = useState(false);
    useEffect(() => {
        // >> For creating the scroll background change effect in the navbar
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true)
            } else handleShow(false)
        });
        return () => {
            window.removeEventListener("scroll", null);
        }
    }, [])
    return (
        <div className={`navbar ${show && "nav_black"}`}>
            <img
                className='nav_logo'
                src="images/logo.png"
                alt="Netflix logo" />
        </div>
    )
}

export default Navbar