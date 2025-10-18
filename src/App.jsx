import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from "./Pages/SignIn.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Home from "./Pages/Landing.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import ProjectCommitPage from "./Pages/ProjectCommit.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/dashboard/:projectName"
          element={<ProjectCommitPage username="Kesava" />}
        />        
      </Routes>
    </Router>
  );
}

export default App;
