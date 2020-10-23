import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, Col, Container, Row} from "react-bootstrap";
import {PJ} from "./PJ";

function App() {
    return (
        <div className="App">
            <Container fluid>
                <Row>
                    <Col>
                        <Button variant="warning"> I am a button!</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <PJ/>
                    </Col>
                </Row>
            </Container>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
