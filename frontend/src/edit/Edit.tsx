import React, {ChangeEvent, useState} from 'react';
import {Button, Form, Image, InputGroup, Modal} from 'react-bootstrap';
import sync from '../assets/sync.svg';
import {Observable} from 'rxjs';
import he from 'he';
import {ErrorDisplay} from '../error/ErrorDisplay';

export interface EditProps {
    show: boolean;
    data: EditData,
    loadTitle: (url: string) => Observable<string>
    handleClose: () => void;
    handleSave: (data: EditData) => void
}

export interface EditData {
    id?: string
    url?: string,
    title?: string,
    tags?: string
}

export const Edit: React.FunctionComponent<EditProps> = (props) => {
    // noinspection JSUnusedLocalSymbols
    const [id, setId] = useState(props.data.id);
    const [url, setUrl] = useState(props.data.url);
    const [title, setTitle] = useState(props.data.title);
    const [tags, setTags] = useState(props.data.tags);

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => setUrl(event.target.value);
    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
    const handleTagsChange = (event: ChangeEvent<HTMLInputElement>) => setTags(event.target.value);

    const handleSave = () => {
        if (!url || url.search(/^https?:\/\//i)) {
            setErrorMessage('URL must start with http:// or https://');
            setShowError(true);
        } else {
            props.handleSave({id, url, title, tags});
        }
    };

    function loadTitle() {
        if (url && url.length > 0) {
            console.log(`load title for ${url}`);
            props.loadTitle(url)
                .subscribe(it => setTitle(he.decode(it)));
        }
    }

    return (
        <Modal show={props.show} onHide={props.handleClose} size={'lg'}>
            <Modal.Header closeButton>
                <Modal.Title>add or edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ErrorDisplay show={showError} message={errorMessage} onClose={() => setShowError(false)}/>
                <Form>
                    <Form.Group controlId={'url'}>
                        <Form.Label>URL</Form.Label>
                        <Form.Control type={'input'} placeholder={'URL of the bookmark'} value={url} onChange={handleUrlChange}/>
                    </Form.Group>
                    <Form.Group controlId={'title'}>
                        <Form.Label>title</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <Button variant={'outline-dark'} onClick={loadTitle}>
                                    <Image src={sync}/>
                                </Button>
                            </InputGroup.Prepend>
                            <Form.Control type={'input'} placeholder={'title'} value={title} onChange={handleTitleChange}/>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId={'tags'}>
                        <Form.Label>tags</Form.Label>
                        <Form.Control type={'input'} placeholder={'tags, separated by whitespace, comma or semicolon'} value={tags}
                                      onChange={handleTagsChange}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
