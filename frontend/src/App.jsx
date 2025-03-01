import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Login from "./pages/Login_Page";
import Register from "./pages/Register_Page";
import ResetPassword from "./pages/ResetPassword_Page";
import LiveMap from "./pages/LiveMap_Page";
import Kendaraan from "./pages/Kendaraan_Page";
import KendaraanDetail from "./pages/KendaraanDetail_Page";
import KendaraanTambah from "./pages/KendaraanTambah_page";
import KendaraanEdit from "./pages/KendaraanEdit_Page";
import HistoriTagihan from "./pages/HistoriTagihan_Page";
import Katalog from "./pages/Katalog_Page";
import Event from "./pages/Event_Page";
import Trip from "./pages/Trip_Page";
import Settings from "./pages/Settings_Page";

const WithSidebar = ({ children }) => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 ml-16 overflow-y-auto bg-gray-100">{children}</div>
  </div>
);

const WithoutSidebar = ({ children }) => (
  <div className="flex h-screen justify-center items-center bg-gray-100">
    {children}
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes without Sidebar */}
        <Route
          path="/login"
          element={
            <WithoutSidebar>
              <Login />
            </WithoutSidebar>
          }
        />
        <Route
          path="/register"
          element={
            <WithoutSidebar>
              <Register />
            </WithoutSidebar>
          }
        />
        <Route
          path="/reset-password"
          element={
            <WithoutSidebar>
              <ResetPassword />
            </WithoutSidebar>
          }
        />

        {/* Routes with Sidebar */}
        <Route
          path="/live-map"
          element={
            <WithSidebar>
              <LiveMap />
            </WithSidebar>
          }
        />
        <Route
          path="/kendaraan"
          element={
            <WithSidebar>
              <Kendaraan />
            </WithSidebar>
          }
        />
        <Route
          path="/kendaraan/tambah"
          element={
            <WithSidebar>
              <KendaraanTambah />
            </WithSidebar>
          }
        />
        <Route
          path="/kendaraan/:id"
          element={
            <WithSidebar>
              <KendaraanDetail />
            </WithSidebar>
          }
        />
        <Route
          path="/kendaraan/:id/edit"
          element={
            <WithSidebar>
              <KendaraanEdit />
            </WithSidebar>
          }
        />
        <Route
          path="/histori-tagihan"
          element={
            <WithSidebar>
              <HistoriTagihan />
            </WithSidebar>
          }
        />
        <Route
          path="/katalog"
          element={
            <WithSidebar>
              <Katalog />
            </WithSidebar>
          }
        />
        <Route
          path="/event"
          element={
            <WithSidebar>
              <Event />
            </WithSidebar>
          }
        />
        <Route
          path="/trip"
          element={
            <WithSidebar>
              <Trip />
            </WithSidebar>
          }
        />
        <Route
          path="/settings"
          element={
            <WithSidebar>
              <Settings />
            </WithSidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
