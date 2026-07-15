
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home/Home";
import Properties from "./pages/Properties/Properties";
import NotFound from "./pages/NotFound/NotFound";
import Search from "./pages/Search/Search";
import Contact from "./pages/Contact/Contact";
import ViewingRequest from "./pages/ViewingRequest/ViewingRequest";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Favorites from "./pages/Favorites/Favorites";
import VacancyStatus from "./pages/VacancyStatus/VacancyStatus";
import Tenant from "./pages/Tenant/Tenant";
import Landlord from "./pages/Landlord/Landlord";
import Caretaker from "./pages/Caretaker/Caretaker";
import Admin from "./pages/Admin/Admin";
import About from "./pages/About/About";
import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/properties" element={<Properties />} />
  <Route path="/search" element={<Search />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/viewing-request" element={<ViewingRequest />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/favorites" element={<Favorites />} />
  <Route path="/vacancy-status" element={<VacancyStatus />} />
  <Route path="/about" element={<About />} />
  <Route
  path="/tenant"
  element={
    <ProtectedRoute role="Tenant">
      <Tenant />
    </ProtectedRoute>
  }
/>

<Route
  path="/landlord"
  element={
    <ProtectedRoute role="Landlord">
      <Landlord />
    </ProtectedRoute>
  }
/>

<Route
  path="/caretaker"
  element={
    <ProtectedRoute role="Caretaker">
      <Caretaker />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute role="Admin">
      <Admin />
    </ProtectedRoute>
  }
/>

  <Route
    path="/property/:id"
    element={<PropertyDetails />}
  />

  <Route
    path="*"
    element={<NotFound />}
  />

</Routes>



      <Footer />

<ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
/>

</>
  );
}

export default App;