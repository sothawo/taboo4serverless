import React from "react";
import {PJ, PJProps} from "./PJ";
import {Story} from "@storybook/react";

export default {
    title: "Test/PJ",
    component: PJ
};

const Template: Story<PJProps> = (args: PJProps) => <PJ {...args}/>;

export const Chapter1 = Template.bind({});

