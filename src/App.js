import Dapp from "./components/Dapp/dApp";
import MainContainer from "./components/Container/MainContainer";
import { Box } from "@chakra-ui/react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<MainContainer />} />
          <Route path="dapp" element={<Dapp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
