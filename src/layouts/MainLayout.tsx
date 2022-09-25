import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  setMiniSideBar,
  setActiveSideBar,
  setActivePageId,
} from "../redux/slices/UiSlice";
import { SideBar } from "../components";
import { Outlet, Link } from "react-router-dom";
function MainLayout() {
  const dispatch = useDispatch();
  const activePageId = useSelector(({ UiSlice }) => UiSlice.activePageId);
  const { sideBarMobileActive, sideBarMini } = useSelector(
    ({ UiSlice }) => UiSlice
  );
  // Функция для изменения активной страницы
  const changeActivePage = (id: number) => {
    dispatch(setActivePageId(id));
    id ? dispatch(setMiniSideBar(true)) : dispatch(setMiniSideBar(false));
  };
  // Открытие сайдбара на бургере
  const onBurgerClick = () => {
    dispatch(setActiveSideBar(!sideBarMobileActive));
  };

  return (
    <div>
      <SideBar
        isMobileActive={sideBarMobileActive}
        isMini={sideBarMini}
        activePageId={activePageId}
        onClick={changeActivePage}
      />
      <main
        className={`main ${sideBarMini ? "main--expanded-for-aside-mini" : ""}`}
      >
        <header className="d-md-none mobile-header px-4 mt-3">
          <Link to="/" className="text-white">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faClapperboard}
                size="lg"
                className="me-1"
              />
              <p>
                MOVIE<span className="blue ">SITE</span>
              </p>
            </div>
          </Link>
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
