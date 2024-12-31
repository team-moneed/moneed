import { Outlet } from "react-router";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Lnb from "./components/Layout/Lnb";
import MobileNav from "./components/Layout/MobileNav";
import { ScrollToTop } from "./routes/ScrollToTop";


function App() {

  return (
    <>
      <div className="flex-1">
        <ScrollToTop />
        <Header />
        <Outlet />
        <Footer />
      </div>
      <MobileNav></MobileNav>
    </>
  )
}

export default App
