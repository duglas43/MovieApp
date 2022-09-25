import React from "react";
import { MovieCardProps } from ".";
const MiniMovieCard: React.FC<MovieCardProps> = ({
  poster_path,
  title,
  vote_average,
}) => {
  return (
    <li className="right-bar__card d-flex gap-2 mb-3">
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        width={100}
        className="rounded-2"
        height={142}
        alt=""
      />
      <div className="right-bar__card-description">
        <p className="right-bar__card-title font-white text-white mb-3">
          {title}
        </p>
        <p className="right-bar__card-date mb-5 ">2022-08-17</p>
        <div className="right-bar__card-rating rounded-5">
          <p className="me-1">{vote_average}</p>
          <i className="bx bxs-star ms-1"></i>
        </div>
      </div>
    </li>
  );
};

export default MiniMovieCard;
