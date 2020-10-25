import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Header, HeaderProps} from "./header/Header";

function App() {
    const navbarHandler = (id: string) => {
        console.log(`Header event with id: ${id}`)
    }

    const headerProps: HeaderProps = {
        availableActive: false,
        selectedActive: false,
        logsActive: false,
        settingsActive: false,
        onClick: navbarHandler
    }

    return (
        <div className="App">
            <Header {...headerProps} />
        </div>
    );
}

export default App;
