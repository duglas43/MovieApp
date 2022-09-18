import React from "react";
import { SideBar } from "./components";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
function App() {
  const isAsideMobileActive = useSelector(
    (state) => state.sidebarSlice.isAsideMobileActive
  );
  const isAsideMini = useSelector((state) => state.sidebarSlice.isMini);
  return (
    <div className="App">
      <SideBar isMobileActive={isAsideMobileActive} isMini={isAsideMini} />
      <main
        className={`main ${isAsideMini ? "main--expanded-for-aside-mini" : ""}`}
      >
        <Home />
      </main>
    </div>
  );
}
export default App;
