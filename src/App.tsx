import { Outlet } from "react-router";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Lnb from "./components/Layout/Lnb";
import MobileNav from "./components/Layout/MobileNav";


function App() {

  return (
    <>
      <div className="flex-1">
        <Header />
        <Outlet />
        <Footer />
      </div>
      <MobileNav></MobileNav>
    </>
  )
}

export default App
