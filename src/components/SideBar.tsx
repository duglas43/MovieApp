import React from "react";
import {
  faClapperboard,
  faHouse,
  faCompass,
  faHeart,
  faMagnifyingGlass,
  faClockRotateLeft,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { setActiveSideBar } from "../redux/slices/UiSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const sideBarList = [
  {
    id: 0,
    icon: faHouse,
    title: "Домашняя страница",
    type: "home",
  },
  {
    id: 1,
    icon: faCompass,
    title: "Навигатор",
    type: "navigation",
  },
  {
    id: 2,
    icon: faMagnifyingGlass,
    title: "Поиск",
    type: "search",
  },
  {
    id: 3,
    icon: faHeart,
    title: "Понравившиеся",
    type: "liked",
  },
  {
    id: 4,
    icon: faClockRotateLeft,
    title: "История",
    type: "history",
  },
];
type SideBarProps = {
  isMini: Boolean;
  isMobileActive: Boolean;
  activePageId: Number;
  onClick: Function;
};
const SideBar: React.FC<SideBarProps> = ({
  isMini,
  isMobileActive,
  activePageId,
  onClick,
}) => {
  const dispatch = useDispatch();
  const onBackDropClick = () => {
    if (isMobileActive) {
      dispatch(setActiveSideBar(false));
    }
  };
  return (
    <div
      onClick={onBackDropClick}
      className={`aside d-md-block ${isMini ? "mini" : ""} ${
        isMobileActive ? "active" : ""
      }`}
    >
      <div className="aside__inner">
        <ul>
          <li>
            <Link to="/" className="logo mb-5 d-flex align-items-center">
              <FontAwesomeIcon
                icon={faClapperboard}
                size="2x"
                className="text-white me-2 logo__img"
              />
              <div className="logo__text text-uppercase text-white">
                Movie<span className="text-primary">Site</span>
              </div>
            </Link>
          </li>
          {sideBarList.map((item, index) => {
            return (
              <li
                className={`aside__item dynamic-text ${
                  item.id === activePageId ? "active" : ""
                }`}
                key={item.id}
                onClick={() => onClick(item.id)}
              >
                <Link to={item.id ? `${item.type}` : "/"}>
                  <FontAwesomeIcon
                    className="aside__item-img"
                    icon={item.icon}
                  />
                  <button className="aside__button" type="button">
                    {item.title}
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="aside__settings">
          <div className="aside__item dynamic-text mb-3">
            <FontAwesomeIcon className="aside__item-img" icon={faGear} />
            <button className="aside__button" type="button">
              Настройки
            </button>
          </div>
          <div className="aside__item dynamic-text mb-4">
            <a
              target={"_blank"}
              rel="noreferrer"
              href="https://github.com/duglas43"
              className="d-flex"
            >
              <i className="aside__item-img  bx bxl-github"></i>
              <p className="aside__button">Dev Duglas43</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
