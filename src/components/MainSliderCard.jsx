import React from "react";
import sliderImg from "../assets/slider-img.jpg";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function SliderCard() {
  return (
    <div
      className="slider-card rounded-2 ps-4 ps-lg-5 pt-1 "
      style={{
        backgroundImage: `linear-gradient(to right, black 0%, transparent 120%),url(${sliderImg})`,
      }}
    >
      <div className="slider-card__rating rounded-5 d-none d-sm-flex">
        <p className="me-1">6.8</p>
        <FontAwesomeIcon icon={faStar} size={"xs"} />
      </div>
      <div className="slider-card__title mb-2">House of Dragons</div>
      <div className="slider-card__subtitle text-white mb-3">Дом драконов</div>
      <div className="slider-card__date mb-2">First air date:2018-05-02</div>
      <ul className="slider-card__tags  gap-2 mb-3 d-none d-sm-flex">
        <li className="tag tag--outline rounded-5">Action</li>
        <li className="tag tag--outline rounded-5">Drama</li>
        <li className="tag tag--outline rounded-5">Comedy</li>
      </ul>
      <div className="slider-card__info d-none d-sm-block">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi facere
        et odit deserunt soluta iusto perferendis, eius, quasi quam consequuntur
        ipsam! Molestia
      </div>
    </div>
  );
}

export default SliderCard;
