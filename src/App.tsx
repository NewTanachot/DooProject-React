import React, { useContext } from "react";
import { Stock, HistoryLog, Register } from "./pages";
import { Login } from "./components";
import { ActionContext } from "../src/context/action";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/shared/Layout";

const App: React.FC = () => {
  const { isLogin } = useContext(ActionContext);
  return (
    <BrowserRouter>
      <Layout>
        {!isLogin && <Login />}
        {isLogin && (
          <Routes>
            <Route path="/" element={<Stock />} />
            <Route path="/register" element={<Register />} />
            <Route path="/log" element={<HistoryLog />} />
          </Routes>
        )}
      </Layout>
    </BrowserRouter>
  );
};

export default App;
