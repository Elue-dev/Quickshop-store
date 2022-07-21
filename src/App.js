import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./components/AllRoutes";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { ModeContext } from "./contexts/ModeContext";

function App() {
  const { mode } = useContext(ModeContext);

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <AllRoutes />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
