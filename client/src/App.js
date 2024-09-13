import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Paypay from "./paypay";
import Success from "./success";
import Failure from "./failure";
import Cancel from "./cancel";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Paypay />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
