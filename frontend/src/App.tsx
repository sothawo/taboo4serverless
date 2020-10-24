import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Header, HeaderEvent, HeaderProps} from "./header/Header";

function App() {
    const navbarHandler = (evt: HeaderEvent) => {
        console.log(`Header event with id: ${evt.id}`)
    }

    const headerProps: HeaderProps = {
        availableActive: false,
        selectedActive: false,
        logsActive: false,
        settingsActive: false
    }

    return (
        <div className="App">
            <Header {...headerProps} onClick={navbarHandler}/>
        </div>
    );
}

export default App;
