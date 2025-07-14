import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global.css";
import MainLayout from "./layouts/MainLayout";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import ToDo from "./pages/ToDo";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/report" element={<Report />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/todo" element={<ToDo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
