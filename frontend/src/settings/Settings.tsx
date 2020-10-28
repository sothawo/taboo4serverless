import React, {ChangeEvent, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";

export interface SettingsProps {
    data: SettingsData,
    handleClose: () => void;
    handleSave: (data: SettingsData) => void
}

export interface SettingsData {
    apiUrl: string,
    apiKey: string
}

export const Settings = (props: SettingsProps) => {
    const [apiUrl, setApiUrl] = useState(props.data.apiUrl)
    const [apiKey, setApiKey] = useState(props.data.apiKey)

    const handleApiUrlChange = (event: ChangeEvent<HTMLInputElement>) => setApiUrl(event.target.value)
    const handleApiKeyChange = (event: ChangeEvent<HTMLInputElement>) => setApiKey(event.target.value)

    return (
        <Modal show={true} onHide={props.handleClose} size={"lg"}>
            <Modal.Header closeButton>
                <Modal.Title>settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId={"apiUrl"}>
                        <Form.Label>API URL</Form.Label>
                        <Form.Control type={"input"} placeholder={"API URL"} value={apiUrl} onChange={handleApiUrlChange}/>
                    </Form.Group>
                    <Form.Group controlId={"apiKey"}>
                        <Form.Label>API Key</Form.Label>
                        <Form.Control type={"input"} placeholder={"API Key"} value={apiKey} onChange={handleApiKeyChange}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    close
                </Button>
                <Button variant="primary" onClick={() => props.handleSave({apiUrl, apiKey})}>
                    save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

