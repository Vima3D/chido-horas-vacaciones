import { BrowserRouter, Routes, Route } from "react-router-dom";
import HorasExtraChido from "./pages/HorasExtraChido";
import HorasExtraCoco from "./pages/HorasExtraCoco";
import VacacionesChido from "./pages/VacacionesChido";
import VacacionesCoco from "./pages/VacacionesCoco";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HorasExtraChido />} />
        <Route path="/vacaciones" element={<VacacionesChido />} />
        <Route path="/cocoextra" element={<HorasExtraCoco />} />
        <Route path="/coco" element={<VacacionesCoco />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
