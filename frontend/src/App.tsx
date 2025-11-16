import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import Todos from "./pages/Todos";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";


const App: React.FC = () => {
return (
<div className="min-h-screen bg-gray-100">
<Navbar />


<div className="max-w-3xl mx-auto p-4">
<Routes>
<Route path="/signup" element={<Signup />} />
<Route path="/login" element={<Login />} />
<Route path="/forgot" element={<Forgot />} />
<Route path="/reset" element={<Reset />} />


<Route
path="/"
element={
<ProtectedRoute>
<Todos />
</ProtectedRoute>
}
/>
</Routes>
</div>
</div>
);
};


export default App;