import React from "react";
import sothawofant from "../assets/sothawofant-32.png";
import "./Header.css";

import {Button, ButtonProps, Image, Navbar} from "react-bootstrap";

export interface HeaderProps {
    /** if the selected button should be set to active. */
    selectedActive: boolean,
    /** if the active button should be set to active. */
    availableActive: boolean
    /**
     * Handler to be called when any of the Navbar elements is clicked.
     * @param evt the HeaderEvent
     */
    onClick?: (evt: HeaderEvent) => void
}

/**
 * Event to be passed in the NavBarProps.onClick(evt) handler.
 */
export interface HeaderEvent {
    /** the id of the clicked element */
    id: string
}

/**
 * The header to be displayed on top of the whole application.
 * @param props: HeaderProps
 * @constructor
 */
export const Header = (props: HeaderProps) => {

    const clickHandler = (id: string) => props.onClick && props.onClick({id: id})

    const commonButtonProps: ButtonProps = {
        variant: "outline-dark",
        size: "sm"
    }

    const addButtonProps: ButtonProps = {
        ...commonButtonProps,
        id: "add",
        active: true,
        onClick: () => clickHandler("add")
    }

    const selectedButtonProps: ButtonProps = {
        ...commonButtonProps,
        id: "selected",
        active: props.selectedActive,
        onClick: () => clickHandler("selected")
    }

    const availableButtonProps: ButtonProps = {
        ...commonButtonProps,
        id: "available",
        active: props.availableActive,
        onClick: () => clickHandler("available")
    }

    return (
        <Navbar expand={"sm"} variant={"dark"} fixed={"top"} bg={"secondary"}>
            <div className="flex-fill d-flex">
                <Image id="init-app" src={sothawofant} width="32" height="32" alt="init-app" onClick={() => clickHandler("init-app")}/>
                <Button {...addButtonProps}>
                    <span className={"d-none d-sm-block"}>add bookmark</span>
                    <span className={"d-block d-sm-none"}>add...</span>
                </Button>
                <Button {...selectedButtonProps}>
                    <span className={"d-none d-sm-block"}>selected</span>
                    <span className={"d-block d-sm-none"}>sel...</span>
                </Button>
                <Button {...availableButtonProps}>
                    <span className={"d-none d-sm-block"}>available</span>
                    <span className={"d-block d-sm-none"}>ava...</span>
                </Button>
                <Button size={"sm"} className={"ml-auto"}>...</Button>
            </div>
        </Navbar>
    );
}
