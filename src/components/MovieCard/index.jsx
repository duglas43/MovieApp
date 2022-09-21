import React from "react";
// import movieCardImg from "../../assets/movieCard.jpg";
import styles from "./MovieCard.module.scss";
function MovieCard({ isGrid, poster_path, name, vote_average }) {
  return (
    <div
      className={`${styles.card} ${isGrid ? styles["card--grid"] : ""}`}
      role="button"
    >
      <div className={`${styles.rating} rounded-5`}>
        {vote_average} <i className="bx bxs-star ms-1"></i>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        width="175"
        height="262"
        className={`${styles.img} rounded-2`}
        alt="Изображение обложки фильма"
      />
      <div className={styles.title}>{name}</div>
    </div>
  );
}

export default MovieCard;
