import React from "react";
import sothawofant from "./assets/sothawofant-32.png";
import "./Nav.css";

export interface NavBarProps {
}

export const NavBar = (props: NavBarProps) =>
    (
        <nav className="navbar navbar-expand-sm navbar-dark bg-secondary fixed-top">
            <div className="flex-fill d-flex">
                <img id="init-app" src={sothawofant} width="32" height="32" alt="init-app"/>
            </div>
        </nav>
    )
