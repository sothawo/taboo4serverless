import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./App.module.css"
import {Header} from "./header/Header";
import {TagList} from "./taglist/TagList";
import {Logs} from "./logs/Logs";
import {Bookmarks} from "./bookmarks/Bookmarks";
import {Bookmark} from "./bookmarks/Bookmark";
import {LogData, LogLevel} from "./logs/LogData";
import {LocalStorage} from "./localstorage/LocalStorage";

export interface AppProps {
    availableActive: boolean,
    selectedActive: boolean,
    logsActive: boolean,
    settingsActive: boolean,
    bookmarks: Bookmark[],
    logData: LogData[],
    localStorage: LocalStorage
}

const appProps: AppProps = {
    availableActive: true,
    selectedActive: true,
    logsActive: false,
    settingsActive: false,
    bookmarks: [new Bookmark("42", "https://www.sothawo.com", "sothawo-website", ["cool", "unbelievable"])],
    logData: [
        new LogData(LogLevel.DEBUG, "some debug message"),
        new LogData(LogLevel.INFO, {foo: "info", level: 7}),
        new LogData(LogLevel.WARN, "some warn message"),
        new LogData(LogLevel.ERROR, {foo: "bar", level: 42})
    ],
    localStorage: new LocalStorage()
}

const toggleComponentAvailability = function (props: AppProps, component: string): AppProps {
    let newProps = {...props};
    switch (component) {
        case "available":
            newProps.availableActive = !newProps.availableActive;
            break
        case "selected":
            newProps.selectedActive = !newProps.selectedActive;
            break;
        case "logs":
            newProps.logsActive = !newProps.logsActive;
            break;
        case "settings":
            newProps.settingsActive = !newProps.settingsActive;
            break;
        default:
            break;
    }
    return newProps;
};

export function App() {

    const [props, setProps] = useState(appProps)

    console.log(props)
    console.log(props.localStorage.get("foo", "nix da"));
    props.localStorage.set("foo", "bar");

    const navbarHandler = (id: string) => {
        console.log(`Header event with id: ${id}`)
        setProps(toggleComponentAvailability(props, id));
    }

    const selectTag = (tag: string) => {
    }
    const deselectTag = (tag: string) => {
    }
    const editBookmark = (id: string) => {
    }
    const deleteBookmark = (id: string) => {
    }
    const clearLogs = () => setProps({...props, logData: []})

    return (
        <div className={styles.App}>
            <Header {...props} onClick={navbarHandler}/>
            {props.selectedActive && <TagList title={"selected tags"} onSelect={selectTag}/>}
            {props.availableActive && <TagList title={"available tags"} onSelect={deselectTag}/>}
            <Bookmarks bookmarks={props.bookmarks} onEdit={editBookmark} onDelete={deleteBookmark}/>
            {props.logsActive && <Logs logs={props.logData} onClear={clearLogs}/>}
        </div>
    );
}

// export default App;
