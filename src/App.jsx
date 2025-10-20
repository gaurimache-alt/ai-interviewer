import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { InterviewContext } from "./context/InterviewContext";
import LoginForm from "./components/Auth/LoginForm";
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
  const {
    started,
    setStarted,
    completed,
    selectedCompany,
    selectCompanyRole,
  } = useContext(InterviewContext);

  const [showCreditsModal, setShowCreditsModal] = useState(false);

  const navigate = useNavigate();

  if (!user) return <LoginForm />;

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
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-md mb-6 rounded-b-xl">
        <h1 className="text-2xl font-bold text-purple-600">AI-Interviewer</h1>
        <div className="space-x-4">
          <Link to="/dashboard" className="text-purple-600 hover:underline">
            Dashboard
          </Link>
          <Link to="/about" className="text-purple-600 hover:underline">
            About Us
          </Link>
          <span
            className="text-red-500 cursor-pointer hover:underline"
            onClick={() => window.location.reload()}
          >
            Logout
          </span>
        </div>
      </nav>

      {/* Buy Credits Modal */}
      {showCreditsModal && <BuyCreditsModal closeModal={closeModal} />}

      <Routes>
        <Route
          path="/dashboard"
          element={<Dashboard credits={credits} onSelect={handleSelectRole} />}
        />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/interview"
          element={
            started && selectedCompany ? (
              <InterviewContainer />
            ) : (
              <Dashboard credits={credits} onSelect={handleSelectRole} />
            )
          }
        />
        <Route path="/completed" element={<CompletionScreen />} />
        <Route
          path="*"
          element={<Dashboard credits={credits} onSelect={handleSelectRole} />}
        />
      </Routes>
    </>
  );
}
