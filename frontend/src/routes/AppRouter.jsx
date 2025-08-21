import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Header from "../components/header";
import Footer from "../components/Footer";
import Parcours from "../pages/Parcours";
import Reservation from "../pages/Reservation";
import Confirmation from "../pages/confirmation";
import RecherchezUnTrajet from "../pages/RecherchezUnTrajet";
import Payements from "../pages/Payements";
import Contact from "../pages/Contact";
import ProtectedRoute from "./ProtectedRoute";

function AppRouter() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/parcours" element={<Parcours />} />
        <Route path="/recherche" element={<RecherchezUnTrajet />} />
        {/* <Route
          path="/reservation"
          element={isAuthenticated ? <Reservation /> : <Navigate to="/login" />}
        /> */}
        <Route
          path="/reservation"
          element={
            <ProtectedRoute>
              <Reservation />
            </ProtectedRoute>
          }
        />

        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/paiements" element={<Payements />} />
        <Route path="*" element={<div>Page non trouvée</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRouter;
