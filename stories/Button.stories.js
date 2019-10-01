import React from 'react';
import { storiesOf } from '@storybook/react';

import MyButton from '../src/app/components/Button/Button';

storiesOf('Button1', module)
  .addDecorator(story => <div style={{ padding: '3rem' }}>{story()}</div>)
  .add('default', () => <MyButton label={`Try 30 days free trial`} />);
