import React from "react";
import {Meta, Story} from "@storybook/react";
import {Settings, SettingsData, SettingsProps} from "./Settings";

export default {
    title: "taboo4/Settings",
    component: Settings
} as Meta;

const Template: Story<any> = (args: SettingsProps) => <Settings {...args} />;

export const SettingsDialog = Template.bind({});
SettingsDialog.args = {
    show: true,
    data: {
        apiUrl: "url",
        apiKey: "key"
    },
    handleClose: () => {
    },
    handleSave: (data: SettingsData) => {
    }
}
