import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Edit, EditData, EditProps} from './Edit';
import {of} from 'rxjs';

export default {
    title: 'taboo4/Edit',
    component: Edit
} as Meta;

const Template: Story<any> = (args: EditProps) => <Edit {...args} />;

export const EditDialog = Template.bind({});
EditDialog.args = {
    show: true,
    data: {
        url: "www.sothawo.com",
        title: "sothawo!",
        tags: "tag1, tag2"
    },
    loadTitle: (url: string) => of(`Title for ${url}`),
    handleClose: () => {
    },
    handleSave: (data: EditData) => {
        console.log(data);
    }
};
