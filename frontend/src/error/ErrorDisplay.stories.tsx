import React from 'react';
import {Meta, Story} from '@storybook/react';
import {ErrorDisplay, ErrorDisplayProps} from './ErrorDisplay';

export default {
    title: 'taboo4/ErrorDisplay',
    component: ErrorDisplay
} as Meta;

const Template: Story<any> = (args: ErrorDisplayProps) => <ErrorDisplay {...args} />;

export const ErrorDisplayShow = Template.bind({});
ErrorDisplayShow.args = {
    show: true,
    message: 'I am an error!',
    onClose: () => {}
};
