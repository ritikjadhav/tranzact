import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" />
        <Route path="/dashboard" />
        <Route path="/send" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
