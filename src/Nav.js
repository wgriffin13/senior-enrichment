import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {

    return (
        <ul className="nav nav-pills justify-content-end">
            <li className="nav-item">
                <NavLink className="nav-link" exact to="/campuses">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" exact to="/students">Students</NavLink>
            </li>
        </ul>
    )
}

export default Nav
