import React from 'react';
import {Button, Modal} from 'react-bootstrap';

export interface ConfirmProps {
    show: boolean,
    title: string,
    message: string,
    onYes: () => void,
    onNo: () => void
}

export const Confirm: React.FunctionComponent<ConfirmProps> = (props) => {
    return (
        <Modal show={props.show} onHide={props.onNo}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onYes}>
                    yes
                </Button>
                <Button variant="primary" onClick={props.onNo}>
                    no
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
