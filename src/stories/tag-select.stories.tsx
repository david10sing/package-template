/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { Story, Meta } from '@storybook/react';

import TagSelect, { TagSelectProps } from '../components/tag-select';
import { options } from '../mock/data';

/* eslint-enable @typescript-eslint/no-unused-vars */

export default {
  title: 'Components/Tag Select',
  component: TagSelect,
} as Meta;

const Template: Story<TagSelectProps> = args => <TagSelect {...args} />;

export const Example = Template.bind({});
Example.args = {};
