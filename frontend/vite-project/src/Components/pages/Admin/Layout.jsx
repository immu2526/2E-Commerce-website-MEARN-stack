import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./admin-views/Sidebar";
import Header from "./admin-views/Header";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  console.log(openSidebar);
  return (
    <>
      <div className="flex min-h-screen w-full">
        {/* Overlay (Sidebar ke piche) */}
        {openSidebar && (
          <div
            onClick={() => setOpenSidebar(false)}
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          ></div>
        )}
        {/* Admin sidebar */}
        <Sidebar opensidebar={openSidebar} closesidebar={setOpenSidebar} />
        <div className="flex flex-1 flex-col">
          {/* admin headers */}

          <Header opensidebar={openSidebar} closesidebar={setOpenSidebar} />

          <main className="flex flex-1  p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
