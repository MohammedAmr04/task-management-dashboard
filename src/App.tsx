import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global.css";
import MainLayout from "./layouts/MainLayout";
import AnalyticsPage from "./pages/AnalyticsPage";
import DashboardPage from "./pages/DashboardPage";
import HistoryPage from "./pages/HistoryPage";
import ReportPage from "./pages/ReportPage";
import SettingsPage from "./pages/SettingsPage";
import ToDoPage from "./pages/ToDoPage";
import TableView from "./components/Todo/table/TableView";
import CardView from "./components/Todo/card/CardView";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/todo" element={<ToDoPage />}>
              <Route index element={<TableView />} />
              <Route path="table-view" element={<TableView />} />
              <Route path="card-view" element={<CardView />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
