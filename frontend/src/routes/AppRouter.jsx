import {BrowserRouter as Router,Routes,Route,Navigate,} from "react-router-dom";
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
import InitData from "../pages/InitData";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";

function AppRouter() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/parcours" element={<Parcours />} />
        <Route path="/recherche" element={<RecherchezUnTrajet />} />
        <Route path="/reservation" element={<ProtectedRoute><Reservation /></ProtectedRoute>} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/paiements" element={<Payements />} />
        <Route path="/init-data" element={<InitData />} />
        <Route path="*" element={<div>Page non trouvée</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRouter;
