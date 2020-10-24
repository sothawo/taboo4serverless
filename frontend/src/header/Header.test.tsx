import React from 'react';
import { render, screen } from '@testing-library/react';
import {Header, HeaderProps} from './Header';

describe('Header tests', () =>{

    test("renders the sothawofant image", () => {

        const headerProps: HeaderProps = {
            selectedActive: true,
            availableActive: true,
            logsActive: true,
            settingsActive: true
        }
        render(<Header {...headerProps} />);
        let elements = screen.getAllByAltText("init-app");
        expect(elements[0]).toBeDefined()
    })
});
