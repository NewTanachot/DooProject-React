import React from "react";
import { Login, Stock, HistoryLog } from "./pages";
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
            <Route index element={<Login onLogin={handleLogin} />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/log" element={<HistoryLog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
