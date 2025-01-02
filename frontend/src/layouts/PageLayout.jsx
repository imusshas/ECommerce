import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const PageLayout = () => {

  return (
    <div>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};