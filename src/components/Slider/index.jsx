import React from "react";
import Slider from "react-slick";
import { MovieCard } from ".././index";
import rightArrow from "../../assets/right-arrow.svg";
import leftArrow from "../../assets/left-arrow.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MySlider() {
  const settings = {
    className: "slider variable-width",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 3,
    variableWidth: true,
    nextArrow: (
      <div>
        <div className="next-slick-arrow">
          <img src={rightArrow} alt="" width={30} height={30} />
        </div>
      </div>
    ),
    prevArrow: (
      <div>
        <div className="prev-slick-arrow">
          <img src={leftArrow} alt="" width={30} height={30} />
        </div>
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div className="slider-wrapper mt-5">
      <p className="slider__title title__text mb-4">Популярное</p>
      <Slider {...settings}>
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </Slider>
    </div>
  );
}
export default MySlider;
