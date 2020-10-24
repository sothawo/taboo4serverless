import React from 'react';
import { render, screen } from '@testing-library/react';
import {Header} from './Header';

describe('Header tests', () =>{

    test("renders the sothawofant image", () => {
        render(<Header />);
        let elements = screen.getAllByAltText("init-app");
        expect(elements[0]).toBeDefined()
    })
});
