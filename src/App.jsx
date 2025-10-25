
import React, { useContext, useState } from "react";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { InterviewContext } from "./context/InterviewContext";
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";
import Dashboard from "./components/Dashboard/Dashboard";
import AboutUs from "./components/About/AboutUs";
import InterviewContainer from "./components/Interview/InterviewContainer";
import CompletionScreen from "./components/Interview/CompletionScreen";
import BuyCreditsModal from "./components/Dashboard/BuyCreditsModal";

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  
  const { user, credits, deductCredits } = useContext(AuthContext);

  
  const interviewCtx = useContext(InterviewContext) || {};
  const {
    started = false,
    setStarted = () => {},
    completed = false,
    selectedCompany = null,
    selectCompanyRole = () => {},
  } = interviewCtx;

  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const navigate = useNavigate();

  const handleSelectRole = (company, role) => {
    if (credits <= 0) {
      setShowCreditsModal(true);
      return;
    }

    if (credits < 5) {
      alert("Not enough credits!");
      return;
    }

    deductCredits(5);
    selectCompanyRole(company, role);
    setStarted(true);
    navigate("/interview");
  };

  const closeModal = () => setShowCreditsModal(false);

  return (
    <>
      
      
      {/* Buy Credits Modal */}
      {showCreditsModal && <BuyCreditsModal closeModal={closeModal} />}

     
      <Routes>
        
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/completed" element={<CompletionScreen />} />

        {/* Protected Dashboard route: redirect to /login when not logged in */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard credits={credits} onSelect={handleSelectRole} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        
        <Route
          path="/interview"
          element={
            user ? (
              started && selectedCompany ? (
                <InterviewContainer />
              ) : (
                
                <Dashboard credits={credits} onSelect={handleSelectRole} />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Root and fallback */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="*"
          element={
            user ? (
              <Dashboard credits={credits} onSelect={handleSelectRole} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
  );
}
