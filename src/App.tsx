import { Outlet, useLocation } from "react-router";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import MenuHeader from "./components/Layout/MenuHeader";
import MobileNav from "./components/Layout/MobileNav";
import { ScrollToTop } from "./routes/ScrollToTop";


function App() {

  const location = useLocation();

  const hideFooterPaths = ["/selectStockType", "/myprofile", "/welcome"];

  const isWritePostPath = location.pathname.startsWith("/writepost");
  const isEditPostPath = location.pathname.startsWith("/editpost");
  const iscommentPath = location.pathname.startsWith("/post");

  const menuHeaderPaths = ["/selectStockType", "/mycomment", "/mypost", "/searchstocktype"];

  return (
    <>
      <div className="flex-1">
        <ScrollToTop />
        <div className="hidden lg:block sticky top-0 z-10 bg-white">
          <Header />
        </div>
        <div className="block lg:hidden sticky top-0 z-10 bg-white">
          {(menuHeaderPaths.includes(location.pathname) || isWritePostPath || isEditPostPath || iscommentPath) ? <MenuHeader /> : <Header />}
        </div>
        <Outlet />
        {!hideFooterPaths.includes(location.pathname) && !isWritePostPath && !isEditPostPath && <Footer />}
      </div>
      {!isWritePostPath && !isEditPostPath && !hideFooterPaths.includes(location.pathname) && <MobileNav></MobileNav>}
    </>
  )
}

export default App
