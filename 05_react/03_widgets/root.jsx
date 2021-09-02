import React from 'react';

import Clock from './clock';
import Tabs from './tabs';
import Weather from './weather';
import Autocomplete from './autocomplete';

const tabs = [
  {
    title: 'one',
    content: 'I am the first',
  },
  {
    title: 'two',
    content: 'Second pane here',
  },
  {
    title: 'three',
    content: 'Third pane here',
  },
  {
    title: 'four',
    content: 'Fourth pane here',
  },
];

const values = [
  {
    id: 1,
    value: 'Abba',
  },
  {
    id: 2,
    value: 'Barney',
  },
  {
    id: 3,
    value: 'Barbara',
  },
  {
    id: 4,
    value: 'Jeff',
  },
  {
    id: 5,
    value: 'Jenny',
  },
  {
    id: 6,
    value: 'Sarah',
  },
  {
    id: 7,
    value: 'Sally',
  },
  {
    id: 8,
    value: 'Xander',
  },
];

const Root = () => (
  <div>
    <Clock />
    <Tabs tabs={tabs} />
    <Weather />
    <Autocomplete values={values} />
  </div>
);

export default Root;
