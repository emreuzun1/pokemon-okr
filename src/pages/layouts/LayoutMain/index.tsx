import { Outlet } from "react-router-dom";
import Navbar from "../../../components/Navbar";

const LayoutMain = () => {
  return (
    <>
      <header className="h-20 sticky top-0 z-50">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default LayoutMain;
