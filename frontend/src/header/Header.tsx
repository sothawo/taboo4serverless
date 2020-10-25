import React from "react";
import sothawofant from "../assets/sothawofant-32.png";
import logs from "../assets/report.svg";
import settings from "../assets/settings.svg";
import styles from "./Header.module.css";

import {Button, ButtonProps, Image, Navbar} from "react-bootstrap";

export interface HeaderProps {
    /** if the selected button should be set to active. */
    selectedActive: boolean,
    /** if the available button should be set to active. */
    availableActive: boolean
    /** if the logs button should be set to active. */
    logsActive: boolean
    /** if the settings button should be set to active. */
    settingsActive: boolean
    /**
     * Handler to be called when any of the Navbar elements is clicked.
     * @param the id of the clicked button
     */
    onClick: (id: string) => void
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

    const commonButtonProps: ButtonProps = {
        variant: "outline-dark",
        size: "sm"
    }

    const addButtonProps: ButtonProps = {
        ...commonButtonProps,
        id: "add",
        active: true,
        onClick: () => props.onClick("add")
    }

    const selectedButtonProps: ButtonProps = {
        ...commonButtonProps,
        id: "selected",
        active: props.selectedActive,
        onClick: () => props.onClick("selected")
    }

    const availableButtonProps: ButtonProps = {
        ...commonButtonProps,
        id: "available",
        active: props.availableActive,
        onClick: () => props.onClick("available")
    }

    const logsButtonProps: ButtonProps = {
        ...commonButtonProps,
        id: "logs",
        active: props.logsActive,
        onClick: () => props.onClick("logs")
    }

    const settingsButtonProps: ButtonProps = {
        ...commonButtonProps,
        id: "setiings",
        active: props.settingsActive,
        onClick: () => props.onClick("settings")
    }

    return (
        <Navbar expand={"sm"} variant={"dark"} fixed={"top"} bg={"secondary"}>
            <div className="flex-fill d-flex">
                <Image className={styles.initApp} src={sothawofant} width="32" height="32" alt="init-app" onClick={() => props.onClick("init-app")}/>
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
                <Button {...logsButtonProps} className={"ml-auto"}>
                    <Image src={logs}/>
                </Button>
                <Button {...settingsButtonProps} >
                    <Image src={settings}/>
                </Button>
            </div>
        </Navbar>
    );
}
