import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoutes from './utils/ProtectedRoutes';
function App() {


  

  return (
    <Router>

    <div className=" bg-black text-white min-h-screen flex items-center justify-center">
     <Routes>
      <Route element={<ProtectedRoutes />}>
      <Route path="/" element={<Dashboard />} />
      </Route>
      <Route path="/Login" element={<Login />} />
      <Route path="/register" element={<Register />} />
     </Routes>
    </div>
    </Router>
  );
}

export default App;
