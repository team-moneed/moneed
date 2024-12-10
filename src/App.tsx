import { Outlet } from "react-router";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";


function App() {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
