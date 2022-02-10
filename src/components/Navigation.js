import React from "react";
import { Link } from "react-router-dom";
import "components/navigation.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faAddressBook } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => (
    <header>
        <h1 id="fstyle_title">Every Calendar</h1>
        <nav>
            <ul>
                <li>
                    <Link to="/">
                    <FontAwesomeIcon icon={faCalendarDays} className="btMargin" color="white" size="3x" />
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                    <FontAwesomeIcon icon={faAddressBook} className="btMargin" color="white" size="3x" />
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
);

export default Navigation;