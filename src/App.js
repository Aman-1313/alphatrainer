import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrainerLoginScreen from './pages/TrainerLoginScreen';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import AccountInfo from './pages/AccountInfo';
import TrainerMeals from './pages/TrainerMeals';
import ClientInfo from './pages/ClientInfo';
import ChatScreen from './pages/ChatScreen';
import AssignDietScreen from './pages/AssignDietScreen';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TrainerLoginScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Clients" element={<Clients />} />
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
