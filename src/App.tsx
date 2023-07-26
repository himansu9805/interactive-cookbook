import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './routes/routes';
import { useUserContext } from './contexts/UserContext';



function App() {

  const { user } = useUserContext();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (user?.id !== undefined) {
      setIsLoggedIn(true);
    }
  }, [user?.id]);

  return (
    <Router>
      <Routes isLoggedIn={isLoggedIn} />
    </Router>
  );
}

export default App;
