import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GeneralPage from './pages/GeneralPage';
import TrainerLoginScreen from './pages/TrainerLoginScreen';
import TrainerSignupScreen from './pages/TrainerSignupScreen';
import TrainerDataForm from './pages/TrainerDataForm';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import EditProfile from './pages/EditProfile';
import AccountInfo from './pages/AccountInfo';
import TrainerMeals from './pages/TrainerMeals';
import ClientInfo from './pages/ClientInfo';
import ChatScreen from './pages/ChatScreen';
import AboutUs from './pages/About';
import DeleteAccount from './pages/DeleteAccount';
import AssignDietScreen from './pages/AssignDietScreen';
import TermsAndConditions from './pages/TermsAndConditions';
import Privacy from './pages/Privacy';

import "./bootstrap.min.css";
// Opening new route scrolling
import "./animate.min.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GeneralPage />} />
        <Route path="/trainer-login" element={<TrainerLoginScreen />} />
        <Route path="/trainer-signup" element={<TrainerSignupScreen />} />
        <Route path="/trainer-signup/data-form/:trainerId" element={<TrainerDataForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Clients" element={<Clients />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/policy-details" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/trainer/account" element={<AccountInfo />} />
        <Route path="/meals-database" element={<TrainerMeals />} />
        <Route path="/trainer/assign-diet/:userId" element={<AssignDietScreen />} />
        <Route path="/trainer/client/:clientId" element={<ClientInfo />} />
        <Route path="/chat/:trainerId/:userId" element={<ChatScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
