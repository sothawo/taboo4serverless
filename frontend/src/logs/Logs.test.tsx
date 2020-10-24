import React from 'react';
import {render, screen} from '@testing-library/react';
import {Logs, LogsProps} from "./Logs";

describe("a Logs component", () => {

    test("should render the title", () => {

        const logProps: LogsProps = {
            logs: [],
            onClear: () => {}
        };

        render(<Logs {...logProps} />);

        let element = screen.getByText("logs");
        expect(element).toBeInTheDocument()
    })
})
