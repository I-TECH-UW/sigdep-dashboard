import { Route, Routes } from "react-router-dom";
import SignOut from "./components/SignOut";
import Home from "./components/Home";
import Manage from "./components/Manage";
import Register from "./components/Register";

import SignIn from "./components/SignIn";
import ProtectedRoutes from "./ProtectedRoutes";

const Views = () => {
  return (
<div style={{ width: '100%', height: '100%' }}>
    <Routes>
      <Route path="/" element={<SignIn />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signOut" element={<SignOut />} />
      </Route>
    </Routes>
    </div>
  );
};

export default Views;
