import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Autocomplete = ({ values }) => {
  const [inputValue, setInputValue] = useState('');

  const filteredValues = values.filter(({ value }) =>
    value.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  const listItems = filteredValues.map(({ id, value }) => {
    return (
      <CSSTransition key={id} timeout={500} classNames={'auto'}>
        <li onClick={() => setInputValue(value)}>{value}</li>
      </CSSTransition>
    );
  });

  return (
    <div>
      <h2>Autocomplete</h2>
      <div className="auto-widget">
        <input
          value={inputValue}
          placeholder="Search..."
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
        />
        <TransitionGroup component="ul">{listItems}</TransitionGroup>
      </div>
    </div>
  );
};

export default Autocomplete;
