// import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login/login';
import Dashboard from './pages/Dashboard/dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: 
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>,
    }
]);

export default router;