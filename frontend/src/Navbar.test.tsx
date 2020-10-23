import React from 'react';
import { render, screen } from '@testing-library/react';
import {NavBar} from './NavBar';

describe('NavBar tests', () =>{

    test("renders the sothawofant image", () => {
        render(<NavBar />);
        let elements = screen.getAllByAltText("init-app");
        expect(elements[0]).toBeDefined()
    })
});
