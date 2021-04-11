/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { Story, Meta } from '@storybook/react';

import ReactTemplateCreator, { ReactTemplateCreatorProps } from '../components/react-template-creator';
import { ShadowProvider } from '../shadow-context';

/* eslint-enable @typescript-eslint/no-unused-vars */

export default {
  title: 'Example',
  component: ReactTemplateCreator,
} as Meta;

const Template: Story<ReactTemplateCreatorProps> = args => (
  <ShadowProvider>
    <ReactTemplateCreator {...args} />
  </ShadowProvider>
);

export const Example = Template.bind({});
