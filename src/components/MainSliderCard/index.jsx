import React from "react";
// import sliderImg from "../../assets/slider-img.jpg";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { genreList } from "../../redux/slices/filterSlice";
function SliderCard({
  backdrop_path,
  vote_average,
  genre_ids,
  title,
  release_date,
  overview,
}) {
  return (
    <div
      className="slider-card rounded-2 ps-4 ps-lg-5 pt-1 "
      style={{
        backgroundImage: `linear-gradient(to right, black 0%, transparent 120%),url(${`https://image.tmdb.org/t/p/w1280${backdrop_path}`}), url("https://via.placeholder.com/1280x720/333335/?text=no+image+):")`,
      }}
    >
      <div className="slider-card__rating rounded-5 d-none d-sm-flex">
        <p className="me-1">{vote_average.toFixed(1)}</p>
        <FontAwesomeIcon icon={faStar} size={"xs"} />
      </div>
      <div className="slider-card__title mb-2">{title}</div>
      <div className="slider-card__subtitle text-white mb-3">Дом драконов</div>
      <div className="slider-card__date mb-2">
        First air date:{release_date}
      </div>
      <ul className="slider-card__tags  gap-2 mb-3 d-none d-sm-flex">
        {genre_ids?.map((item) => {
          return (
            <li key={item} className="tag tag--outline rounded-5">
              {genreList.find((listItem) => listItem.id === item).name || ""}
            </li>
          );
        })}
      </ul>
      <div className="slider-card__info d-none d-sm-block">
        {overview.length > 200 ? `${overview.slice(0, 200)}...` : overview}
      </div>
    </div>
  );
}

export default SliderCard;
