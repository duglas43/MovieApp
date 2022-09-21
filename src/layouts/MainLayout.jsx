import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setMini, setActive } from "../redux/slices/sidebarSlice";
import { setActivePageId } from "../redux/slices/filterSlice";
import { SideBar } from "../components";
import { Outlet } from "react-router-dom";
function MainLayout() {
  const dispatch = useDispatch();
  const activePageId = useSelector(
    ({ filterSlice }) => filterSlice.activePageId
  );
  const isAsideMobileActive = useSelector(
    (state) => state.sidebarSlice.mobileActive
  );
  const isAsideMini = useSelector((state) => state.sidebarSlice.isMini);
  const sideBarItemClick = (id) => {
    dispatch(setActivePageId(id));
    id ? dispatch(setMini(true)) : dispatch(setMini(false));
  };
  const onBurgerClick = () => {
    dispatch(setActive(!isAsideMobileActive));
  };
  return (
    <div>
      <SideBar
        isMobileActive={isAsideMobileActive}
        isMini={isAsideMini}
        activePageId={activePageId}
        onClick={sideBarItemClick}
      />
      <main
        className={`main ${isAsideMini ? "main--expanded-for-aside-mini" : ""}`}
      >
        <header className="d-md-none mobile-header px-4 mt-3">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faClapperboard} size="lg" className="me-1" />
            <p>
              MOVIE<span className="blue ">SITE</span>
            </p>
          </div>
          <div
            className="burger light__text"
            onClick={() => {
              onBurgerClick();
            }}
          >
            <i className="bx bx-menu"></i>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
