/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { Story, Meta } from '@storybook/react';

import Tag, { TagProps } from '../components/tag';
import { options } from '../mock/data';

/* eslint-enable @typescript-eslint/no-unused-vars */

export default {
  title: 'Components/Tag',
  component: Tag,
} as Meta;

const Template: Story<TagProps> = args => <Tag {...args} />;

export const Example = Template.bind({});
Example.args = {
  data: options[0],
};
