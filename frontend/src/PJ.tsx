import React from "react";
import {Spinner} from "react-bootstrap";

export interface PJProps {
}

export function PJ(props: PJProps) {
    return <h1>Hello, P.J.! <Spinner animation="border"/></h1>
}
