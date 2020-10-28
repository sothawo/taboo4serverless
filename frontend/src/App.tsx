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
import {Settings, SettingsData} from "./settings/Settings";

export interface AppProps {
    availableActive: boolean,
    selectedActive: boolean,
    logsActive: boolean,
    showSettings: boolean,
    bookmarks: Bookmark[],
    logData: LogData[],
    localStorage: LocalStorage
}

const initialAppProps: AppProps = {
    availableActive: true,
    selectedActive: true,
    logsActive: false,
    showSettings: false,
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
        default:
            break;
    }
    return newProps;
};

export function App() {

    const [props, setProps] = useState<AppProps>(initialAppProps)

    const navbarHandler = (id: string) => {
        console.log(`Header event with id: ${id}`)
        switch (id) {
            case "settings":
                setProps({...props, showSettings: true})
                break;
            default:
                setProps(toggleComponentAvailability(props, id));
                break;
        }
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

    const handleSettingsClose = () => setProps({...props, showSettings: false})
    const handleSettingsSave = (data: SettingsData) => {
        setProps({...props, showSettings: false})
        props.localStorage.set("apiKey", data.apiKey);
        props.localStorage.set("apiUrl", data.apiUrl);
    }


    return (
        <div className={styles.App}>
            <Header {...props} onClick={navbarHandler}/>
            {props.selectedActive && <TagList title={"selected tags"} onSelect={selectTag}/>}
            {props.availableActive && <TagList title={"available tags"} onSelect={deselectTag}/>}
            <Bookmarks bookmarks={props.bookmarks} onEdit={editBookmark} onDelete={deleteBookmark}/>
            {props.logsActive && <Logs logs={props.logData} onClear={clearLogs}/>}

            {props.showSettings && <Settings data={{
                apiUrl: props.localStorage.get("apiUrl") || "",
                apiKey: props.localStorage.get("apiKey") || ""
            }}
                                             handleClose={handleSettingsClose} handleSave={handleSettingsSave}/>}
        </div>
    );
}

// export default App;
