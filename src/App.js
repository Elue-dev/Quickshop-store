import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./components/AllRoutes";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { ModeContext } from "./contexts/ModeContext";
import ScrollToTop from "./ScrollToTop";

function App() {
  const { mode } = useContext(ModeContext);

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <AllRoutes />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
