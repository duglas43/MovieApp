import React from "react";
import movieCardImg from "../../assets/movieCard.jpg";
import styles from "./MovieCard.module.scss";
function MovieCard() {
  return (
    <div className={styles.card}>
      <div className={`${styles.rating} rounded-5`}>
        6.7 <i className="bx bxs-star ms-1"></i>
      </div>
      <img
        src={movieCardImg}
        width="175"
        height="262"
        className={`${styles.img} rounded-2`}
        alt="Изображение обложки фильма"
      />
      <div className={styles.title}>Хроники нарнии </div>
    </div>
  );
}

export default MovieCard;
