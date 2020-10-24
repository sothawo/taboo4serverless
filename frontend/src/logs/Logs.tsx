import React from "react";
import {Button, Card, Image} from "react-bootstrap";
import "./Logs.css"
import trashcan from "../assets/trashcan.svg";
import {LogData} from "./LogData";

/**
 * Logs properties.
 */
export interface LogsProps {
    /** the log entries. */
    logs?: LogData[],
    /** function to be called when the clear button is pressed. */
    onClear: () => void
}

export const Logs = (props: LogsProps) =>
    <Card>
        <Card.Header className={"d-flex"}>logs
            <Button variant={"outline-dark"} size={"sm"} className={"ml-auto"} onClick={() => props.onClear()}>
                <Image src={trashcan}/>
            </Button>
        </Card.Header>
        <Card.Body>
            {props.logs && props.logs.map((logData) => {
                return (
                    <div className={"msg"}>
                        <pre className={logData.level}>{format(logData)}</pre>
                    </div>
                )
            })}
        </Card.Body>
    </Card>

const format = (logData: LogData) => {
    return `${logData.level}\n${formatMessage(logData.data)}`
}

const formatMessage = (o: any): string => {
    return typeof o === 'string' ? o : JSON.stringify(o, null, 2);
}
