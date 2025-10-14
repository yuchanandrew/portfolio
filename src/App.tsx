import CardStack from "./components/CardStack";
import Layout from "./components/Layout";
import MoreInfo from "./components/MoreInfo";
import Profile from "./components/Profile";
import Typing from "./components/Typing";
import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/Test";
import Blog from "./pages/Blog";

import axios from "axios";
import Freelance from "./pages/Freelance";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/freelance" element={<Freelance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
