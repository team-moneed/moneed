import { Outlet, useLocation } from "react-router";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import MobileNav from "./components/Layout/MobileNav";
import { ScrollToTop } from "./routes/ScrollToTop";


function App() {

  const location = useLocation();

  const hideFooterPaths = ["/selectStockType"];

  return (
    <>
      <div className="flex-1">
        <ScrollToTop />
        <Header />
        <Outlet />
        {!hideFooterPaths.includes(location.pathname) && <Footer />}
      </div>
      <MobileNav></MobileNav>
    </>
  )
}

export default App
