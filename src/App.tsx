import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global.css";
import { Suspense, lazy } from "react";
import { Spin } from "antd";
import { Auth0ProviderWithNavigate } from "./services/context/AuthProvider";

const MainLayout = lazy(() => import("./layouts/MainLayout"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const ReportPage = lazy(() => import("./pages/ReportPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ToDoPage = lazy(() => import("./pages/ToDoPage"));
const TableView = lazy(() => import("./components/Todo/table/TableView"));
const CardView = lazy(() => import("./components/Todo/card/CardView"));
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./protectedroutes/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full relative ">
          <Spin
            size="large"
            className="absolute top-[50%] start-[50%] -translate-[-50%]"
          />
        </div>
      }
    >
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route
                path="analytics"
                element={
                  <ProtectedRoute allowedRoles={["Admin"]}>
                    <AnalyticsPage />
                  </ProtectedRoute>
                }
              />

              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="report" element={<ReportPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="unauthorized" element={<Unauthorized />} />

              <Route
                path="todo"
                element={
                  <ProtectedRoute allowedRoles={["Regular user", "Admin"]}>
                    <ToDoPage />
                  </ProtectedRoute>
                }
              >
                <Route index element={<TableView />} />
                <Route path="table-view" element={<TableView />} />
                <Route path="card-view" element={<CardView />} />
              </Route>
            </Route>
          </Routes>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
