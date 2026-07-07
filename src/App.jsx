import { BrowserRouter, Routes, Route } from "react-router-dom";
import HorasExtra from "./pages/HorasExtra";
import Vacaciones from "./pages/Vacaciones";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HorasExtra />} />
        <Route path="/vacaciones" element={<Vacaciones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
