import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css';
import {from, of} from 'rxjs';
import {filter, mergeMap, switchMap} from 'rxjs/operators';
import {Header} from './header/Header';
import {TagList} from './taglist/TagList';
import {Logs} from './logs/Logs';
import {Bookmarks} from './bookmarks/Bookmarks';
import {Bookmark} from './bookmarks/Bookmark';
import {LogData} from './logs/LogData';
import {LocalStorage} from './localstorage/LocalStorage';
import {Settings, SettingsData} from './settings/Settings';
import {Logger} from './logs/Logger';
import {Backend} from './backend/Backend';

export interface AppProps {
    availableActive: boolean,
    selectedActive: boolean,
    logsActive: boolean,
    showSettings: boolean,
    availableTags: Set<string>,
    selectedTags: Set<string>,
    bookmarks: Bookmark[],
    logData: LogData[],
    localStorage: LocalStorage
}

const initialAppProps: AppProps = {
    availableActive: true,
    selectedActive: true,
    logsActive: false,
    showSettings: false,
    availableTags: new Set(),
    selectedTags: new Set(),
    bookmarks: [],
    logData: [],
    localStorage: new LocalStorage()
};


const toggleComponentAvailability = function (props: AppProps, component: string): AppProps {
    let newProps = {...props};
    switch (component) {
        case 'available':
            newProps.availableActive = !newProps.availableActive;
            break;
        case 'selected':
            newProps.selectedActive = !newProps.selectedActive;
            break;
        case 'logs':
            newProps.logsActive = !newProps.logsActive;
            break;
        default:
            break;
    }
    return newProps;
};

export function App() {

    const [props, setProps] = useState<AppProps>(initialAppProps);

    const logger = new Logger({
        log: (logData: LogData) => {
            props.logData.push(logData);
            setProps({...props});
        }
    });

    const backend = new Backend(props.localStorage, logger);

    const navbarHandler = (id: string) => {
        console.log(`Header event with id: ${id}`);
        switch (id) {
            case 'init-app':
                initApp();
                break;
            case 'settings':
                setProps({...props, showSettings: true});
                break;
            default:
                setProps(toggleComponentAvailability(props, id));
                break;
        }
    };

    const initApp = () => {
        backend.allTags().subscribe(allTags => {
            logger.debug(`<- data:`);
            logger.debug(allTags);
            const newProps = {
                ...props,
                availableTags: new Set(allTags),
                selectedTags: new Set<string>(),
                bookmarks: []
            };
            setProps(newProps);
        });
    };

    const selectTag = (tag: string) => adjustSelectedTags(tag, true);

    const deselectTag = (tag: string) => adjustSelectedTags(tag, false);

    const adjustSelectedTags = (tag: string, add: boolean) => {
        const selectedTags = new Set(props.selectedTags);
        if (add) {
            selectedTags.add(tag);
        } else {
            selectedTags.delete(tag);
            if (selectedTags.size == 0) {
                initApp();
                return;
            }
        }
        backend.bookmarksByTags(Array.from(selectedTags))
            .pipe(
                switchMap(bookmarks =>
                    of(bookmarks.map(it => new Bookmark(it.id, it.url, it.title, it.tags)))
                )
            ).subscribe(bookmarks => {
            logger.debug('<- data:');
            logger.debug(bookmarks);
            const availableTags = buildAvailableTags(bookmarks, selectedTags);

            setProps({
                ...props,
                availableTags: availableTags,
                selectedTags: selectedTags,
                bookmarks: bookmarks
            });
        });
    };

    const editBookmark = (id: string) => {
    };

    const deleteBookmark = (id: string) => {
    };

    const clearLogs = () => setProps({...props, logData: []});

    const handleSettingsClose = () => setProps({...props, showSettings: false});
    const handleSettingsSave = (data: SettingsData) => {
        logger.info('saving settings:');
        logger.info(data);
        props.localStorage.set('apiUrl', data.apiUrl);
        props.localStorage.set('apiKey', data.apiKey);
        props.localStorage.set('logLevel', data.logLevel);
        setProps({...props, showSettings: false});
    };


    return (
        <div className={styles.App}>
            <Header {...props} onClick={navbarHandler}/>
            {props.selectedActive && <TagList title={'selected tags'} tags={Array.from(props.selectedTags)} onSelect={deselectTag}/>}
            {props.availableActive && <TagList title={'available tags'} tags={Array.from(props.availableTags)} onSelect={selectTag}/>}
            <Bookmarks bookmarks={props.bookmarks} onEdit={editBookmark} onDelete={deleteBookmark}/>
            {props.logsActive && <Logs logs={props.logData} onClear={clearLogs}/>}
            <Settings
                show={props.showSettings}
                data={{
                    apiUrl: props.localStorage.get('apiUrl') || '',
                    apiKey: props.localStorage.get('apiKey') || '',
                    logLevel: props.localStorage.get('logLevel') || 'INFO'
                }}
                handleClose={handleSettingsClose}
                handleSave={handleSettingsSave}/>
        </div>
    );
}

/**
 * builds the available tags from the bookmarks. available are the bookmarks tags without the selected tags.
 */
const buildAvailableTags = (bookmarks: Bookmark[], selectedTags: Set<string>) => {
    const availableTags: Set<string> = new Set();
    from(bookmarks)
        .pipe(
            mergeMap(bookmark => bookmark.tags),
            filter(tag => !selectedTags.has(tag))
        )
        .subscribe(tag => availableTags.add(tag));
    return availableTags;
};
