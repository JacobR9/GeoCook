import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import MealDetailPage from "./pages/MealDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/country/:area/meal/:id" element={<MealDetailPage />} />      </Routes>
    </BrowserRouter>
  );
}

export default App;