import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure Toastify CSS is imported
import Login from './component/Login.jsx';
import Register from './component/Register';
import { auth } from './firebase';
import Home from './view/Home.js';
import CreateProduct from './component/CreateProduct.js';
import Classroom from './component/Classroom.js'
import Classrooms from './component/Classrooms.js'
import ShowRoom from './component/ShowRoom.js';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user:any) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createproduct" element={<CreateProduct />} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/showroom" element={<ShowRoom />} />

        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
