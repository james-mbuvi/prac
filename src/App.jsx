import React, { useState } from "react";
import Sidebar from "./Home/Sidebar";
import LoginForm from "./LoginForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {isLoggedIn && <Sidebar />}
      <LoginForm isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
    </div>
  );
}

export default App;































