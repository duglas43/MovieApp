import React from "react";
import movieCardImg from "../../assets/movieCard.jpg";
function MiniMovieCard() {
  return (
    <li className="right-bar__card d-flex gap-2 mb-3">
      <img
        src={movieCardImg}
        width={100}
        className="rounded-2"
        height={142}
        alt=""
      />
      <div className="right-bar__card-description">
        <p className="right-bar__card-title font-white text-white mb-3">
          Хроники нарнии
        </p>
        <p className="right-bar__card-date mb-5 ">2022-08-17</p>
        <div className="right-bar__card-rating rounded-5">
          <p className="me-1">6.8</p>
          <i className="bx bxs-star ms-1"></i>
        </div>
      </div>
    </li>
  );
}

export default MiniMovieCard;
