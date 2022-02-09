import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
    <nav>
        <ul>
            <li>
                <Link to="/">Every</Link>
            </li>
            <li>
                <Link to="/profile">My</Link>
            </li>
        </ul>
    </nav>
);

export default Navigation;