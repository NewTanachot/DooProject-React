import React from "react";
import { Stock, HistoryLog, Register } from "./pages";
import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/shared/Layout";

const App: React.FC = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Stock />} />
            <Route path="/register" element={<Register />} />
            <Route path="/log" element={<HistoryLog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
