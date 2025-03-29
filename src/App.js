
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import CoursesPage from './CoursesPage';
import Login from './LoginForm';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/CoursesPage" element={<CoursesPage />}/>
      <Route path="/LoginForm" element={<Login />}/>
    </Routes>
  </BrowserRouter>
  );
};  

export default App;