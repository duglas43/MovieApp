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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function SideBar({ isMini, isMobileActive }) {
  return (
    <div
      className={`aside d-none d-md-block ${isMini ? "mini" : ""} ${
        isMobileActive ? "active" : ""
      }`}
    >
      <div className="aside__inner">
        <ul>
          <li className="logo mb-5 d-flex align-items-center">
            <FontAwesomeIcon
              icon={faClapperboard}
              size="2x"
              className="text-white me-2 logo__img"
            />
            <div className="logo__text text-uppercase text-white">
              Movie<span className="text-primary">Site</span>
            </div>
          </li>
          <li className="aside__item dynamic-text active">
            <FontAwesomeIcon className="aside__item-img" icon={faHouse} />
            <button className="aside__button" type="button">
              Домашняя страница
            </button>
          </li>
          <li className="aside__item dynamic-text">
            <FontAwesomeIcon className="aside__item-img" icon={faCompass} />
            <button className="aside__button" type="button">
              Навигатор
            </button>
          </li>
          <li className="aside__item dynamic-text">
            <FontAwesomeIcon
              className="aside__item-img"
              icon={faMagnifyingGlass}
            />
            <button className="aside__button" type="button">
              Поиск
            </button>
          </li>
          <li className="aside__item dynamic-text">
            <FontAwesomeIcon className="aside__item-img" icon={faHeart} />
            <button className="aside__button" type="button">
              Понравившиеся
            </button>
          </li>
          <li className="aside__item dynamic-text">
            <FontAwesomeIcon
              className="aside__item-img"
              icon={faClockRotateLeft}
            />
            <button className="aside__button" type="button">
              История
            </button>
          </li>
        </ul>
        <div className="aside__settings">
          <div className="aside__item dynamic-text">
            <FontAwesomeIcon className="aside__item-img" icon={faGear} />
            <button className="aside__button" type="button">
              Настройки
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
