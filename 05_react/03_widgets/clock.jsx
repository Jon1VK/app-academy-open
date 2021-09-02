import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="clock">
      <h2>Clock</h2>
      <div className="clock-widget">
        <div>
          <span>Time:</span>
          <time>{date.toLocaleTimeString()}</time>
        </div>
        <div>
          <span>Date:</span>
          <time>{date.toLocaleDateString()}</time>
        </div>
      </div>
    </div>
  );
};

export default Clock;
