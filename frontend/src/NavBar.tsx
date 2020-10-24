import React from "react";
import sothawofant from "./assets/sothawofant-32.png";
import "./Nav.css";

import {Image} from "react-bootstrap";

export interface NavBarProps {
    /**
     * Handler to be called when any of the Navbar elements is clicked.
     * @param evt
     */
    onClick?: (evt: NavBarEvent) => void
}

/**
 * Event to be passed in the NavBarProps.onClick(evt) handler.
 */
export interface NavBarEvent {
    /** the id of the clicked element */
    id: string
}

export const NavBar = (props: NavBarProps) => {

    const initHandler = () => props.onClick && props.onClick({id: "init-app"})

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-secondary fixed-top">
            <div className="flex-fill d-flex">
                <Image id="init-app" src={sothawofant} width="32" height="32" alt="init-app" onClick={initHandler}/>
            </div>
        </nav>
    );
}
