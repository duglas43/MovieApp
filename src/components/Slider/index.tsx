import React from "react";
import Slider from "react-slick";
import rightArrow from "../../assets/right-arrow.svg";
import leftArrow from "../../assets/left-arrow.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MovieItem } from "../../redux/slices/moviesSlice";
const PrevArrow: React.FC<any> = ({ currentSlide, slideCount, ...props }) => {
  return (
    <button {...props}>
      <div className="prev-slick-arrow">
        <img src={leftArrow} alt="" width={30} height={30} />
      </div>
    </button>
  );
};
const NextArrow: React.FC<any> = ({ currentSlide, slideCount, ...props }) => {
  return (
    <button {...props}>
      <div className="next-slick-arrow">
        <img src={rightArrow} alt="" width={30} height={30} />
      </div>
    </button>
  );
};
const MySlider: React.FC<{ slideList: any; listTitle: string }> = ({
  slideList,
  listTitle,
}) => {
  const settings = {
    className: "slider variable-width",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 3,
    variableWidth: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
      <p className="slider__title title__text mb-4">{listTitle}</p>
      <Slider {...settings}>{slideList}</Slider>
    </div>
  );
};
export default MySlider;
