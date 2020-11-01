import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css';
import {from, Observable, of} from 'rxjs';
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
import {Edit, EditData} from './edit/Edit';
import {ErrorDisplay} from './error/ErrorDisplay';

export interface AppProps {
    availableActive: boolean,
    selectedActive: boolean,
    logsActive: boolean,
    showSettings: boolean,
    availableTags: Set<string>,
    selectedTags: Set<string>,
    bookmarks: Bookmark[],
    logData: LogData[],
    localStorage: LocalStorage,
    showEdit: boolean,
    editData: EditData,
    showError: boolean,
    errorMessage: string
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
    localStorage: new LocalStorage(),
    showEdit: false,
    editData: {},
    showError: false,
    errorMessage: ''
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

    let showError = function (msg: string, data?: any) {
        logger.error(msg);
        if (data) {
            logger.error(data);
        }
        setProps({...props, showError: true, errorMessage: msg});
    };

    const navbarHandler = (id: string) => {
        console.log(`Header event with id: ${id}`);
        switch (id) {
            case 'init-app':
                allTags().subscribe(
                    appProps => setProps(appProps),
                    error => showError('Error loading all tags', error)
                );
                break;
            case 'settings':
                setProps({...props, showSettings: true});
                break;
            case 'add':
                setProps({...props, showEdit: true});
                break;
            default:
                setProps(toggleComponentAvailability(props, id));
                break;
        }
    };

    const allTags = (): Observable<AppProps> => {
        return backend.allTags()
            .pipe(
                mergeMap(allTags => {
                    logger.debug(`<- data:`);
                    logger.debug(allTags);
                    return of({
                        ...props,
                        availableTags: new Set(allTags),
                        selectedTags: new Set<string>(),
                        bookmarks: []
                    });
                })
            );
    };

    const selectTag = (tag: string) => adjustSelectedTags(true, tag)
        .subscribe(newProps => setProps(newProps));

    const deselectTag = (tag: string) => adjustSelectedTags(false, tag)
        .subscribe(newProps => setProps(newProps));

    const adjustSelectedTags = (add: boolean, tag?: string): Observable<AppProps> => {
        const selectedTags = new Set(props.selectedTags);
        if (tag) {
            if (add) {
                selectedTags.add(tag);
            } else {
                selectedTags.delete(tag);
                if (selectedTags.size === 0) {
                    return allTags();
                }
            }
        }
        return backend.bookmarksByTags(Array.from(selectedTags))
            .pipe<Bookmark[], AppProps>(
                switchMap(bookmarks =>
                    of(bookmarks.map(it => new Bookmark(it.id, it.url, it.title, it.tags)))
                ),
                switchMap(bookmarks => {
                    logger.debug('<- data:');
                    logger.debug(bookmarks);
                    const availableTags = buildAvailableTags(bookmarks, selectedTags);
                    return of({
                        ...props,
                        availableTags: availableTags,
                        selectedTags: selectedTags,
                        bookmarks: bookmarks
                    });
                })
            );
    };

    const editBookmark = (bookmark: Bookmark) => {
        setProps({
            ...props,
            showEdit: true,
            editData: {
                id: bookmark.id,
                url: bookmark.url,
                title: bookmark.title,
                tags: bookmark.joinedTags()
            }
        });
    };

    const deleteBookmark = (id?: string) => {
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

    const handleEditClose = () => setProps({...props, showEdit: false});
    const handleEditSave = (data: EditData) => {
        logger.info('-> saving bookmark:');
        logger.info(data);
        if (!data.url || data.url.search(/^https?:\/\//i)) {
            showError("URL must start with http:// or https://")
        } else {
            const tags = data.tags ? splitTags(data.tags) : [];
            const bookmark = new Bookmark(data.id, data.url, data.title, tags);
            backend.saveBookmark(bookmark)
                .subscribe(savedBookmark => {
                    logger.info('<- saved bookmark:');
                    logger.info(savedBookmark);
                    props.bookmarks = [];
                    props.selectedTags = new Set(bookmark.tags);
                    adjustSelectedTags(true)
                        .subscribe(newProps =>
                            setProps({...newProps, showEdit: false}));
                });
        }
    };

    const loadTitle = (url: string): Observable<string> => backend.loadTitle(url);

    return (
        <div className={styles.App}>
            <Header {...props} onClick={navbarHandler}/>

            {props.showError && <ErrorDisplay show={props.showError} message={props.errorMessage} onClose={() => {
                setProps({...props, showError: false});
            }}/>
            }

            {props.selectedActive && <TagList title={'selected tags'} tags={Array.from(props.selectedTags)} onSelect={deselectTag}/>}

            {props.availableActive && <TagList title={'available tags'} tags={Array.from(props.availableTags)} onSelect={selectTag}/>}

            <Bookmarks bookmarks={props.bookmarks} onEdit={editBookmark} onDelete={deleteBookmark}/>

            {props.logsActive && <Logs logs={props.logData} onClear={clearLogs}/>}

            {props.showSettings && <Settings
                show={props.showSettings}
                data={{
                    apiUrl: props.localStorage.get('apiUrl') || '',
                    apiKey: props.localStorage.get('apiKey') || '',
                    logLevel: props.localStorage.get('logLevel') || 'INFO'
                }}
                handleClose={handleSettingsClose}
                handleSave={handleSettingsSave}/>}

            {props.showEdit && <Edit show={props.showEdit}
                                     data={props.editData}
                                     loadTitle={loadTitle}
                                     handleClose={handleEditClose}
                                     handleSave={handleEditSave}/>}

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

const splitTags = (tags: string) =>
    tags.split(/[\s;,.]/).filter(it => it !== '');
