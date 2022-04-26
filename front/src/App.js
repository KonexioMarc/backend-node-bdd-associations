import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Admin from './components/Admin'
import Association from './components/Association';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/association/:id" element={<Association/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
