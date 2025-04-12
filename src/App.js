
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import CoursesPage from './CoursesPage';
import Login from './LoginForm';
import SignupPage from './SignupPage';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/CoursesPage" element={<CoursesPage />}/>
      <Route path="/LoginForm" element={<Login />}/>
      <Route path="/SignupPage" element={<SignupPage />}/>
    </Routes>
  </BrowserRouter>
  );
};  

export default App;