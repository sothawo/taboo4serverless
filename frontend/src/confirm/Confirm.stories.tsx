import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Confirm, ConfirmProps} from './Confirm';

export default {
    title: 'taboo4/Confirm',
    component: Confirm
} as Meta;

const Template: Story<any> = (args: ConfirmProps) => <Confirm {...args} />;

export const ErrorDisplayShow = Template.bind({});
ErrorDisplayShow.args = {
    show: true,
    data: {
        title: 'are you sure',
        message: 'that this is what you want?',
    },
    onYes: () => {
    },
    onNo: () => {
    }
};
