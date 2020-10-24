import React from "react";
import {Meta, Story} from "@storybook/react";
import {Logs, LogsProps} from "./Logs";
import {LogData, LogLevel} from "./LogData";

export default {
    title: "taboo4/Logs",
    component: Logs
} as Meta;

const Template: Story<LogsProps> = (args: LogsProps) => <Logs {...args} />;

export const LogsAreEmpty = Template.bind({});
LogsAreEmpty.args = {};

export const LogsAreAvailable = Template.bind({});
LogsAreAvailable.args = {
    logs: [
        new LogData(LogLevel.DEBUG, "some debug message"),
        new LogData(LogLevel.INFO, {foo: "info", level: 7}),
        new LogData(LogLevel.WARN, "some warn message"),
        new LogData(LogLevel.ERROR, {foo: "bar", level: 42})
    ]
};
