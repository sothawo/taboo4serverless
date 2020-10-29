import React, {ChangeEvent, useState} from 'react';
import {Button, Form, FormCheck, Modal} from 'react-bootstrap';
import {LogLevel} from '../logs/LogData';

export interface SettingsProps {
    data: SettingsData,
    handleClose: () => void;
    handleSave: (data: SettingsData) => void
}

export interface SettingsData {
    apiUrl: string,
    apiKey: string,
    logLevel: string
}

export const Settings = (props: SettingsProps) => {
    const [apiUrl, setApiUrl] = useState(props.data.apiUrl);
    const [apiKey, setApiKey] = useState(props.data.apiKey);
    const [logLevel, setLogLevel] = useState(props.data.logLevel);

    const handleApiUrlChange = (event: ChangeEvent<HTMLInputElement>) => setApiUrl(event.target.value);
    const handleApiKeyChange = (event: ChangeEvent<HTMLInputElement>) => setApiKey(event.target.value);

    const logLevels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];

    return (
        <Modal show={true} onHide={props.handleClose} size={'lg'}>
            <Modal.Header closeButton>
                <Modal.Title>settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId={'apiUrl'}>
                        <Form.Label>API URL</Form.Label>
                        <Form.Control type={'input'} placeholder={'API URL'} value={apiUrl} onChange={handleApiUrlChange}/>
                    </Form.Group>
                    <Form.Group controlId={'apiKey'}>
                        <Form.Label>API key</Form.Label>
                        <Form.Control type={'input'} placeholder={'API Key'} value={apiKey} onChange={handleApiKeyChange}/>
                    </Form.Group>
                    <Form.Group controlId={'logLevel'}>
                        <Form.Label>log level</Form.Label>
                        <div>
                            {logLevels.map((level, index) => (
                                <FormCheck inline name={'level'} type={'radio'}
                                           key={index}
                                           label={level.toLowerCase()}
                                           checked={level === logLevel}
                                           onChange={(evt) => setLogLevel(level)}
                                />
                            ))}
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    close
                </Button>
                <Button variant="primary" onClick={() => props.handleSave({apiUrl, apiKey, logLevel})}>
                    save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

