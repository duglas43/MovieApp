import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  setMiniSideBar,
  setActiveSideBar,
  setActivePageId,
  pageList,
} from "../redux/slices/UiSlice";
import { SideBar } from "../components";
import { Outlet, useLocation } from "react-router-dom";
function MainLayout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const activePageId = useSelector(({ UiSlice }) => UiSlice.activePageId);
  const { sideBarMobileActive, sideBarMini } = useSelector(
    ({ UiSlice }) => UiSlice
  );
  // Функция для изменения активной страницы
  const changeActivePage = (id) => {
    dispatch(setActivePageId(id));
    id ? dispatch(setMiniSideBar(true)) : dispatch(setMiniSideBar(false));
  };
  // Открытие сайдбара на бургере
  const onBurgerClick = () => {
    dispatch(setActiveSideBar(!sideBarMobileActive));
  };

  // Отправка данных о активной странице в Redux при первом рендере
  React.useEffect(() => {
    const id = pageList.find(
      (item) => item.type === location.pathname.slice(1)
    )?.id;
    if (location.pathname.slice(1)) {
      dispatch(setActivePageId(id));
      dispatch(setMiniSideBar(true));
    }
  }, []);

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
