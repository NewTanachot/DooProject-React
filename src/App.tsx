import React from "react";
import LoginPage from "./pages/Login";
import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/shared/Layout";

const App: React.FC = () => {
  const handleLogin = (username: string, password: string) => {
    // perform the login logic here
    console.log(`Login with username: ${username} and password: ${password}`);
  };

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<LoginPage onLogin={handleLogin} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
