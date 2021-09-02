import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="tabs">
      <h2>Tabs</h2>
      <div className="tabs-widget">
        <Header
          tabs={tabs}
          selectedTab={selectedTab}
          selectTab={setSelectedTab}
        />
        <article>{tabs[selectedTab].content}</article>
      </div>
    </div>
  );
};

const Header = ({ tabs, selectedTab, selectTab }) => {
  const tabListItems = tabs.map(({ title }, id) => {
    const className = selectedTab === id ? 'selected' : null;
    return (
      <li key={id} className={className} onClick={() => selectTab(id)}>
        <span>{title}</span>
      </li>
    );
  });

  return <ul>{tabListItems}</ul>;
};

export default Tabs;
