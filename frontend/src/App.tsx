import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavBar, NavBarEvent} from "./NavBar";

function App() {
    const navbarHandler = (evt: NavBarEvent) => {
        console.log(`NavBar event with id: ${evt.id}`)
    }

    return (
        <div className="App">
            <NavBar onClick={navbarHandler}/>
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
