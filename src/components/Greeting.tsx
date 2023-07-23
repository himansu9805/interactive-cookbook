import React, { useState, useEffect } from 'react';

const Greeting: React.FC = () => {
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    const getGreeting = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      if (currentHour < 12) {
        setGreeting('Good morning');
      } else if (currentHour < 18) {
        setGreeting('Good afternoon');
      } else {
        setGreeting('Good evening');
      }
    };

    getGreeting();
  }, []);

  return (<>{greeting}</>);
};

export default Greeting;
