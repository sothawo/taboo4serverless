import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';

export interface ErrorDisplayProps {
    /** Flag wether to show the error toast. */
    show: boolean
    /** the error message. */
    message: string
    /** close handler. */
    onClose: () => void
}

export const ErrorDisplay: React.FunctionComponent<ErrorDisplayProps> = (props) => {
    return <Alert show={props.show} variant="danger" onClose={props.onClose} dismissible>
        <Alert.Heading>Error</Alert.Heading>
        <p>
            {props.message}
        </p>
    </Alert>;
};
