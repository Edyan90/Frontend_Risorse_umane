import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./components/Index";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import Dipendenti from "./components/Dipendenti";
import Ferie from "./components/Ferie";
import BustePaga from "./components/BustePaga";
import Presenze from "./components/Presenze";
import Assenze from "./components/Assenze";
import Profile from "./components/Profile";

function App() {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route element={<Layout darkTheme={darkTheme} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/dipendenti" element={<Dipendenti />} />
            <Route path="/ferie" element={<Ferie />} />
            <Route path="/bustepaga" element={<BustePaga />} />
            <Route path="/presenze" element={<Presenze />} />
            <Route path="/assenze" element={<Assenze />} />
            <Route path="/dipendenti/:dipendenteID" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
